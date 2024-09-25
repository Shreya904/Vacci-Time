import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Vaccine = () => {
  const vaccinationSchedule = [
    {
      age: "AT BIRTH (0 weeks)",
      vaccines: [
        {
          name: "Bacillus Calmette Guerin (BCG)",
          description: "Protection against tuberculosis.",
        },
        {
          name: "Oral Polio Vaccine (OPV) – 0 dose",
          description: "Protects against the poliovirus.",
        },
        {
          name: "Hepatitis B birth dose",
          description:
            "Protects against Hepatitis B, a viral infection that attacks the liver and can cause both acute and chronic disease.",
        },
      ],
    },
    {
      age: "6 WEEKS",
      vaccines: [
        {
          name: "Oral Polio Vaccine (OPV) - 1",
          description: "Protects against the poliovirus.",
        },
        {
          name: "Pentavalent - 1",
          description:
            "Protection against Diphtheria, Pertussis, Tetanus, Hepatitis B, and Hib.",
        },
        {
          name: "Rotavirus Vaccine (RVV) - 1",
          description:
            "Protection against rotaviruses, the most common cause of severe diarrhoeal disease in infants and young children.",
        },
        {
          name: "Pneumococcal Conjugate Vaccine (PCV) - 1*",
          description:
            "Protection against meningitis, septicemia, pneumonia, and milder infections such as sinusitis and otitis media.",
        },
        {
          name: "Inactivated Polio Vaccine (fIPV) - 1",
          description: "Protection from the poliovirus.",
        },
      ],
    },
    {
      age: "10 WEEKS",
      vaccines: [
        {
          name: "Pentavalent - 2",
          description:
            "Protection against Diphtheria, Pertussis, Tetanus, Hepatitis B, and Hib.",
        },
        {
          name: "Oral Polio Vaccine (OPV) - 2",
          description: "Protects against the poliovirus.",
        },
        {
          name: "Rotavirus Vaccine (RVV) - 2",
          description: "Protection against rotaviruses.",
        },
      ],
    },
    {
      age: "14 WEEKS",
      vaccines: [
        {
          name: "Pentavalent - 3",
          description:
            "Protection against Diphtheria, Pertussis, Tetanus, Hepatitis B, and Hib.",
        },
        {
          name: "Oral Polio Vaccine (OPV) - 3",
          description: "Protects against the poliovirus.",
        },
        {
          name: "Rotavirus Vaccine (RVV) - 3",
          description: "Protection against rotaviruses.",
        },
        {
          name: "Pneumococcal Conjugate Vaccine (PCV) - 2",
          description:
            "Protection against Diphtheria, Pertussis, Tetanus, Hepatitis B, and Hib.",
        },
        {
          name: "Inactivated Polio Vaccine (fIPV) - 2",
          description: "Protects against the poliovirus.",
        },
      ],
    },
    {
      age: "9-12 MONTHS",
      vaccines: [
        {
          name: "Measles & Rubella (MR) - 1",
          description: "Protection against measles and rubella.",
        },
        {
          name: "Japanese Encephalitis (JE-1) **",
          description:
            "Protection against Japanese Encephalitis, the main cause of viral encephalitis in Asia.",
        },
        {
          name: "Pneumococcal Conjugate Vaccine - Booster*",
          description:
            "Protection against pneumonia, ear infections, sinus infections, meningitis, and bacteremia.",
        },
      ],
    },
    {
      age: "16-24 MONTHS",
      vaccines: [
        {
          name: "Measles & Rubella (MR) - 2",
          description: "Protection against measles and rubella.",
        },
        {
          name: "Japanese Encephalitis (JE-2) **",
          description: "Protection against Japanese Encephalitis.",
        },
        {
          name: "Diphtheria Pertussis & Tetanus (DPT) - Booster 1",
          description: "Protection from diphtheria, pertussis, and tetanus.",
        },
        {
          name: "Oral Polio Vaccine – Booster",
          description: "Protects against the poliovirus.",
        },
      ],
    },
    {
      age: "5-6 YEARS",
      vaccines: [
        {
          name: "Diphtheria Pertussis & Tetanus (DPT) - Booster 2",
          description: "Protection from diphtheria, pertussis, and tetanus.",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#09111f] min-h-screen p-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        Vaccination Details
      </h1>
      <div className="space-y-4">
        {vaccinationSchedule.map((vaccine, id) => (
          <Card key={id} className="bg-[#1e293b] shadow-lg rounded-lg p-4">
            <CardHeader className="border-b border-gray-700 pb-2">
              <CardTitle className="text-xl font-semibold text-white">
                {vaccine.age}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vaccine.vaccines.map((title, id) => (
                <div key={id} className="mt-2">
                  <CardDescription className="text-lg text-blue-300">
                    {title.name}
                  </CardDescription>
                  <p className="text-gray-400">{title.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Vaccine;
