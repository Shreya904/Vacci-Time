'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from './ui/button';
import { Label } from './ui/label';

type FormValues = {
    Email: string;
    Password: string;
};


const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <div>
            <Label htmlFor="email">Your email address</Label>

            <input id='email'
                type="text"
                placeholder="Email"
                {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.Email && <span>Email is required and must be valid</span>}
            </div>
            <div>
                <span>Password</span>
            <input
                type="password"
                placeholder="Password"
                {...register("Password", { required: true, minLength: 8 })}
            />
            {errors.Password && <span>Password must be at least 8 characters</span>}
            </div>
            <div>
            <Button variant="outline">Log In</Button>
            </div>
           
            </div>
           
        </form>
    );
}

export default LoginForm