"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { IoMdPersonAdd } from "react-icons/io";
import { auth } from "@/lib/firebase"; // Firebase initialization
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Firebase auth methods
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the schema using Zod for validation
const SignupSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    phoneNumber: z.string()
        .min(10, { message: "Phone number must be exactly 10 digits" })
        .regex(/^[0-9]+$/, { message: "Phone number must contain only digits" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    
    // Initialize the form using `react-hook-form` with `zodResolver`
    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
        setIsLoading(true); // Disable form during submission
        try {
            // Firebase user creation
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            // Update Firebase user profile with the name
            await updateProfile(user, {
                displayName: data.name,
            });

            // Show success message
            toast({
                title: "Account Created",
                description: `Welcome, ${data.name}!`,
            });

            // Redirect the user to a dashboard or home page
            router.push("/"); // Redirect to the dashboard after successful sign-up
        } catch (error) {
            // Handle errors (like email already in use)
            toast({
                title: "Registration Failed",
                description: `Error: ${error}`,
            });
        } finally {
            setIsLoading(false); // Re-enable the form
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone Number Field */}
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button className="w-full gap-1 bg-green-700" type="submit" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Create Account"}
                        <IoMdPersonAdd className="text-white text-lg" />
                    </Button>
                </form>
            </Form>
            <Link href='/login'>
                <Button variant="link" className="text-neutral-400 w-2/3 mt-2">
                    Already have an account? Login
                </Button>
            </Link>
        </>
    );
};

export default SignupForm;
