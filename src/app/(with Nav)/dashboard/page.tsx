import { Button } from "@/components/ui/button";
import chImg from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChildTable from "@/components/ChildTable";

const DashBoard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start p-8 bg-[#09111f] min-h-screen w-full overflow-hidden">
      {/* Image Section */}
      <Image
        src={chImg}
        height={800} // Set a fixed height to match the text section
        width={800} // Maintain aspect ratio
        alt="children"
        className="hidden md:block h-full object-cover rounded-lg shadow-lg max-w-[35%] mr-8"
      />

      {/* Text Section */}
      <div className="flex-1 space-y-6 bg-[#0f172a] p-8 rounded-lg shadow-md max-w-2xl h-full min-w-[60%]">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-4">Hey There!</h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Keep your little ones safe and healthy! Stay updated on their
            vaccination schedule with our easy reminders, so you never miss an
            important shot.
          </p>
        </div>

        {/* User Information */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-inner">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <h2 className="text-2xl mt-2 font-semibold text-white">
            Keshav Yadav
          </h2>
          <p className="text-md text-gray-400 mt-2">9829887724</p>
          <p className="text-md text-gray-400">keshav9829@gmail.com</p>
        </div>

        {/* Add Child Button */}
        <div className="mt-8 flex justify-start">
          <Button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300">
            Add Child
          </Button>
        </div>

        <ChildTable />
      </div>
    </div>
  );
};

export default DashBoard;
