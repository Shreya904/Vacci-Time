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
import { auth, googleProvider } from "@/lib/firebase"; // Import Firebase Auth
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

// Define the schema using Zod
const FormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

const LoginForm = () => {
    // Initialize the form using `react-hook-form` with `zodResolver`
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    // Handle form submission for email/password
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast({
                title: "Success!",
                description: "Logged in successfully.",
            });

            router.push("/");
        } catch (error) {
            toast({
                title: "Error",
                description: `Login failed: ${error}`,
            });
        }
    }

    // Handle Google login
    async function handleGoogleLogin() {
        try {
            await signInWithPopup(auth, googleProvider);

            router.push("/");
            toast({
                title: "Success!",
                description: "Logged in with Google successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: `Google login failed: ${error}`,
            });
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                    <Button className="w-full bg-green-700" type="submit">Log In</Button>
                </form>
            </Form>
            <Link href='/signup' >
                <Button variant="link" className="text-neutral-400  w-2/3 mt-2">Create new account</Button>
            </Link>
            <div className="border-b-2 my-7 border-neutral-600 w-2/3"></div>
            <Button className="w-2/3 hover:bg-green-700" type="button" onClick={handleGoogleLogin}>
                Login with Gmail
            </Button>
        </>
    );
}

export default LoginForm;