"use client";
import "../globals.css";
import Header from "@/Components/Header";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";

const Component = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>CarrerCraft | AI Based Resume Builder</title>
        <meta
          name="description"
          content="CarrerCraft is an AI-powered resume builder and analyzer designed to create impactful resumes. It evaluates resume fitness, matches resumes with job descriptions, and calculates ATS scores to enhance job application success.
          Built with Next.js (daisyUI) for UI and Python (NLP) for analysis, CarrerCraft ensures resumes are optimized for the best hiring outcomes. 🚀"
        />
      </head>
      <body className={`antialiased`}>
        <Header />
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <Component>{children}</Component>
    </UserProvider>
  );
}
