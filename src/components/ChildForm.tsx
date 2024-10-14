"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Schema with added fields
export const FormSchema = z.object({  // Export FormSchema here
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
    childName: z.string().min(1, "Child's name is required."),
});

// Type for the form data
type FormData = z.infer<typeof FormSchema>;

// Function to calculate age from DOB
function calculateAge(dob: Date): number {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Update the ChildForm component to accept onSubmit as a prop
const ChildForm = ({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) => {
    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
    });

    async function handleSubmit(data: FormData) {
        const age = calculateAge(data.dob);
        const updatedData = { ...data, age };

        // Call the parent's onSubmit function to handle data submission
        await onSubmit(updatedData);

        // Reset the form after submission
        form.reset();
    }

    return (
        <div className="md:w-[60%] w-[90%] mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 ">

                    {/* Child's name field */}
                    <FormField
                        control={form.control}
                        name="childName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Child&apos;s Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter child's name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Date of birth */}
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal bg-transparent",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    The date of birth is used to calculate your child&apos;s age.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-green-700 w-full">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default ChildForm;
