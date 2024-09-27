"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { IoLogOut } from "react-icons/io5";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const NavbarComp = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center py-4 bg-[#09111f]">
      <Link href="/">
        <Button variant="link" className="text-neutral-400  w-2/3 mt-2">
          Dashboard
        </Button>
      </Link>
      <Link href="/vaccine">
        <Button variant="link" className="text-neutral-400  w-2/3 mt-2">
          Know More
        </Button>
      </Link>
      <Button className="gap-1 bg-green-700" onClick={handleLogout}>
        Logout <IoLogOut className="text-white text-lg" />{" "}
      </Button>
    </div>
  );
};

export default NavbarComp;
