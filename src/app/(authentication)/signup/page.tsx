'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";  // Importing the Button from ShadCN

type FormValues = {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
};

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                    className="border rounded p-2 w-full"
                />
                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
            </div>

            <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <input
                    id="phoneNumber"
                    type="text"
                    placeholder="Enter your phone number"
                    {...register("phoneNumber", {
                        required: "Phone number is required",
                        minLength: {
                            value: 10,
                            message: "Phone number must be at least 10 digits",
                        },
                        maxLength: {
                            value: 10,
                            message: "Phone number must not exceed 10 digits",
                        },
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Phone number must contain only digits",
                        },
                    })}
                    className="border rounded p-2 w-full"
                />
                {errors.phoneNumber && (
                    <span className="text-red-600">{errors.phoneNumber.message}</span>
                )}
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                        },
                    })}
                    className="border rounded p-2 w-full"
                />
                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                    className="border rounded p-2 w-full"
                />
                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
            </div>

            <Button type="submit" className="w-full">
                Submit
            </Button>
        </form>
    );
};

export default SignupForm;
