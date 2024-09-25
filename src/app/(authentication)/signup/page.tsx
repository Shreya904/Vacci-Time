import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { Button } from "@/components/ui/button"


type FormValues = {
    Name: string;
    PhoneNumber: string;
    Email: string;
    Password: string;
};

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Name"
                {...register("Name", { required: true })}
            />
            {errors.Name && <span>Name is required</span>}

            <input
                type="number"
                placeholder="Phone Number"
                {...register("PhoneNumber", { required: true, minLength: 10, maxLength: 10 })}
            />
            {errors.PhoneNumber && <span>Phone number must be exactly 10 digits</span>}

            <input
                type="text"
                placeholder="Email"
                {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.Email && <span>Email is required and must be valid</span>}

            <input
                type="password"
                placeholder="Password"
                {...register("Password", { required: true, minLength: 8 })}
            />
            {errors.Password && <span>Password must be at least 8 characters</span>}

            <input type="submit" />
        </form>
    );
}


export default SignupForm