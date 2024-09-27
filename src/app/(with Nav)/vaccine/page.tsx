"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaSyringe } from "react-icons/fa";
import { collection, getDocs, query, orderBy } from "firebase/firestore"; 
import { db } from "@/lib/firebase"; 

// Define a Vaccine type
interface Vaccine {
  id: string;
  age: string; // Adjust type as necessary (e.g., number or string)
  vaccines: {
    name: string;
    description: string;
  }[]; // Adjust this structure to match your Firestore data
}

const Vaccine = () => {
  const [vaccinationSchedule, setVaccinationSchedule] = useState<Vaccine[]>([]); // Specify state type
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchVaccinationSchedule = async () => {
      try {
        const vaccineCollection = collection(db, 'vaccinationSchedule');
        const q = query(vaccineCollection, orderBy('ageOrder', 'asc'));
        const querySnapshot = await getDocs(q);
        const scheduleData: Vaccine[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vaccine[]; // Ensure correct typing
        setVaccinationSchedule(scheduleData); 
      } catch (error) {
        console.error("Error fetching vaccination schedule: ", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchVaccinationSchedule();
  }, []); 

  return (
    <div className="bg-[#09111f] min-h-screen p-8">
      <h1 className="text-3xl gap-2 font-bold flex text-white mb-6">
        Vaccination Details <FaSyringe />
      </h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {vaccinationSchedule.map((vaccine) => (
            <Card
              key={vaccine.id} // Using unique id for the key
              className="bg-[#1e293b] shadow-lg rounded-lg p-4 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
            >
              <CardHeader className="border-b border-gray-700 pb-2">
                <CardTitle className="text-xl font-semibold text-white">
                  {vaccine.age}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {vaccine.vaccines.map((title, index) => (
                  <div key={index} className="mt-2">
                    <CardDescription className="text-lg text-green-700">
                      {title.name}
                    </CardDescription>
                    <p className="text-gray-400">{title.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vaccine;
