import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

// Twilio credentials
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
const sendVaccineReminderSms = async (phoneNumber: string, vaccine: string, childName: string) => {
  const messageBody = `Reminder: Your child ${childName} is due for the following vaccine: ${vaccine}. Please make sure to schedule the vaccination soon.`;

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const data = {
      To: phoneNumber, // Parent's phone number from Firestore
      MessagingServiceSid: messagingServiceSid, // Twilio Messaging Service SID
      Body: messageBody, // SMS body content
    };

    const config = {
      auth: {
        username: "ACfd74cb7587fd9d41b460ab662f96bffd",
        password: "5a22c5799a0d736c2c3901ba0bbf2707",
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
    const q = query(collection(db, "children"), where("userId", "==", user.uid));
    const childrenSnapshot = await getDocs(q);
    const children = childrenSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const vaccineSnapshot = await getDocs(collection(db, "vaccinationSchedule"));
    const vaccineSchedule = vaccineSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    for (const child of children) {
      const childAgeInWeeks = calculateAgeInWeeks(new Date(child.birthDate));

      for (const vaccine of vaccineSchedule) {
        if (childAgeInWeeks >= vaccine.minAge && childAgeInWeeks <= vaccine.maxAge) {
          if (child.phoneNumber) {
            await sendVaccineReminderSms(child.phoneNumber, vaccine.name, child.childName);
          } else {
            console.error(`Phone number missing for child: ${child.childName}`);
          }
        }
      }
    }
  } else {
    console.error("User is not logged in");
  }
};
