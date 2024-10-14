import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

// Define the type for Vaccine
interface Vaccine {
  id: string;
  minAge: number;
  maxAge: number;
  name: string;
}

// Define the type for Child
interface Child {
  id: string;
  userId: string;
  birthDate: string;
  childName: string;
  phoneNumber?: string;
}

// Twilio credentials (consider using environment variables)
const accountSid = "ACfd74cb7587fd9d41b460ab662f96bffd"; // Your Twilio Account SID
const authToken = "5a22c5799a0d736c2c3901ba0bbf2707"; // Your Twilio Auth Token
const messagingServiceSid = "MGf6680a54c685eb74b41b4bc67495a414"; // Messaging Service SID for sending SMS

// 1. Calculate Age in Weeks
const calculateAgeInWeeks = (birthDate: Date) => {
  const currentDate = new Date();
  const timeDiff = Math.abs(currentDate.getTime() - birthDate.getTime());
  return Math.floor(timeDiff / (1000 * 3600 * 24 * 7)); // Age in weeks
};

// 2. Send Vaccine Reminder SMS
const sendVaccineReminderSms = async (
  phoneNumber: string,
  vaccine: Vaccine,
  childName: string
) => {
  const messageBody = `Reminder: Your child ${childName} is due for the following vaccine: ${vaccine.name}. Please make sure to schedule the vaccination soon.`;

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const data = {
      To: phoneNumber, // Parent's phone number from Firestore
      MessagingServiceSid: messagingServiceSid, // Twilio Messaging Service SID
      Body: messageBody, // SMS body content
    };

    const config = {
      auth: {
        username: accountSid, // Use Account SID for the username
        password: authToken, // Use Auth Token for the password
      },
    };

    // Send the SMS using Twilio API
    await axios.post(url, new URLSearchParams(data), config);
    console.log("SMS sent successfully");
  } catch (error) {
    console.error("Error sending SMS: ", error);
  }
};

// 3. Check Vaccine Schedule and Send SMS
export const checkAndSendVaccineReminderSms = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const q = query(
        collection(db, "children"),
        where("userId", "==", user.uid)
      );
      const childrenSnapshot = await getDocs(q);
      const children: Child[] = childrenSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Child)
      ); // Explicitly cast as Child

      const vaccineSnapshot = await getDocs(
        collection(db, "vaccinationSchedule")
      );
      const vaccineSchedule: Vaccine[] = vaccineSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Vaccine)
      ); // Explicitly cast as Vaccine

      for (const child of children) {
        const childAgeInWeeks = calculateAgeInWeeks(new Date(child.birthDate));

        for (const vaccine of vaccineSchedule) {
          if (
            childAgeInWeeks >= vaccine.minAge &&
            childAgeInWeeks <= vaccine.maxAge
          ) {
            if (child.phoneNumber) {
              await sendVaccineReminderSms(
                child.phoneNumber,
                vaccine, // Pass the whole vaccine object
                child.childName
              );
            } else {
              console.error(
                `Phone number missing for child: ${child.childName}`
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  } else {
    console.error("User is not logged in");
  }
};
