"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Firebase initialization

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in
                setIsAuthenticated(true);
            } else {
                // User is not logged in, redirect to login page
                router.push("/login");
            }
            setIsLoading(false);
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, [router]);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner if needed
    }

    // Render children only if authenticated
    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
