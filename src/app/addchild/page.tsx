"use client";

import ChildForm, { FormSchema } from '@/components/ChildForm'; // Import FormSchema from ChildForm
import { useRouter } from 'next/navigation'; // Import useRouter to handle redirects
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Ensure your Firebase setup is correctly imported
import React from 'react';
import { z } from 'zod';
import { getAuth } from 'firebase/auth';

// Define the FormData type based on the schema
type FormData = z.infer<typeof FormSchema>;

const AddChild = () => {
    const router = useRouter();

    // Explicitly type the childData parameter
    async function addChildToFirebase(childData: FormData) {
        const auth = getAuth();
        const userId = auth.currentUser?.uid; // Get the current user's UID
    
        // Check if user is authenticated
        if (!userId) {
            console.error("User is not authenticated");
            return; // Exit if no user is logged in
        }
    
        try {
            const docRef = await addDoc(collection(db, 'children'), {
                ...childData,
                userId: userId, // Set the actual logged-in user ID
            });
            console.log('Document written with ID: ', docRef.id);
            router.push('/'); // Redirect to the homepage after success
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }

    return (
        <div className='flex flex-col'>
            <h1 className="text-center w-full text-xl my-7 font-semibold">Enter your child details</h1>
            <div className='mb-11'>
                <ChildForm onSubmit={addChildToFirebase} /> {/* Pass addChildToFirebase as prop */}
            </div>
        </div>
    );
};

export default AddChild;
