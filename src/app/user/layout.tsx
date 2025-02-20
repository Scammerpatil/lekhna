"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider, useUser } from "@/context/UserContext";
import SideNav from "./SideNav";
import { useEffect } from "react";
import axios from "axios";

const Component = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/auth/verifytoken");
      if (response.data) {
        setUser(response.data.user);
      }
    };
    fetchUser();
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Lekhana | AI Based Resume Builder</title>
        <meta
          name="description"
          content="Lekhana (Sanskrit for 'Writing' or 'Documentation') is an AI-powered resume builder and analyzer designed to create impactful resumes. It evaluates resume fitness, matches resumes with job descriptions, and calculates ATS scores to enhance job application success.
          Built with Next.js (daisyUI) for UI and Python (NLP) for analysis, Lekhana ensures resumes are optimized for the best hiring outcomes. 🚀"
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <SideNav>{children}</SideNav>
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
