# VacciTime

**VacciTime** is a web application designed to help parents stay on top of their child’s vaccination schedule. This platform sends timely reminders when a vaccination is due, ensuring that children from ages 0 to 5 receive their required immunizations. Built with modern technologies like Next.js, TypeScript, Tailwind CSS, and ShadCN for a smooth and responsive frontend experience, VacciTime utilizes Firebase for secure backend operations, user authentication, and data management. Twilio powers the notification system, sending SMS reminders to parents to ensure they never miss an important vaccination date.

## Features

- **User Authentication**: Secure login and registration for parents via Firebase Authentication.
- **Vaccination Info Page**: Lists all recommended vaccines for children ages 0 to 5, each with brief descriptions and information on why they're important.
- **Personalized Dashboard**: A dashboard tailored for each parent, showing their child’s details..
- **Reminders and Notifications**: Automatic SMS notifications sent to parents on vaccination days and two days prior via Twilio.
- **Form Validation**: Robust form validation powered by Zod for accurate data entry and error handling.
  
## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/) - Server-side rendering and static site generation
  - [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript development
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
  - [ShadCN](https://shadcn.dev/) - Custom components for consistent UI
  - [Zod](https://zod.dev/) - Schema-based validation for ensuring accurate data input
- **Backend**:
  - [Firebase](https://firebase.google.com/) - Real-time database, authentication, and backend infrastructure
  - [Twilio](https://www.twilio.com/) - SMS service for sending vaccination reminders

