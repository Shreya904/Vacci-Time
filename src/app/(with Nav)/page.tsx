"use client";

import { Button } from "@/components/ui/button";
import chImg from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChildTable from "@/components/ChildTable";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import { MdWavingHand } from "react-icons/md";
import ProtectedRoute from "@/components/ProtectedRoute";
import { auth } from "@/lib/firebase";
import { User as FirebaseUser } from "firebase/auth"; // Import the User type from Firebase

const DashBoard = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null); // Type the user state

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // currentUser is already of type User | null
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row items-center md:items-start bg-[#09111f] min-h-screen w-full overflow-hidden">
        {/* Image Section */}
        <div className="md:w-[40%] w-0 h-[90vh] sticky left-0 bottom-0 flex items-center">
          <Image
            src={chImg}
            height={1000}
            width={1000}
            alt="children"
            className="hidden md:block rounded-lg shadow-lg mr-8"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 space-y-6 bg-[#0f172a] p-8 rounded-lg shadow-md h-full md:min-w-[60%] w-full">
          <div className="mb-6">
            <h1 className="text-4xl flex gap-2 font-bold text-white mb-4">
              Hey There! <MdWavingHand className="text-4xl" />
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Keep your little ones safe and healthy! Stay updated on their
              vaccination schedule with our easy reminders, so you never miss an
              important shot.
            </p>
          </div>

          {/* User Information */}
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-inner">
            <Avatar>
              {user?.photoURL ? (
                <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
              ) : (
                <AvatarFallback>
                  <IoMdPerson />
                </AvatarFallback>
              )}
            </Avatar>

            <h2 className="text-2xl mt-2 font-semibold text-white">
              {user?.displayName || "User"}
            </h2>
            <p className="text-md text-gray-400 mt-2">{user?.phoneNumber || "No phone number available"}</p>
            <p className="text-md text-gray-400">{user?.email || "No email available"}</p>
          </div>

          {/* Add Child Button */}
          <div className="mt-8 flex justify-start">
            <Link href='/addchild' className="w-full">
              <Button className="bg-green-700 gap-1 text-white px-6 py-2 rounded-md focus:ring focus:ring-blue-300 w-full">
                Add Child <FaUserPlus className="text-white text-base" />
              </Button>
            </Link>
          </div>

          <ChildTable />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashBoard;
