"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const CreateResumePage = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <>
      <h1 className="text-4xl text-center uppercase font-bold mb-6">
        Choose a template
      </h1>
      <div className="flex flex-row gap-2 mb-4 max-w-4xl mx-auto">
        {/* Resume With Photo and Without Photo */}
        <Link
          href={`/user/create-resume/with-photo`}
          className="btn btn-primary w-1/2 h-32 text-2xl"
        >
          Resume With Photo
        </Link>
        <Link
          href={`/user/create-resume/without-photo`}
          className="btn btn-primary w-1/2 h-32 text-2xl"
        >
          Resume Without Photo
        </Link>
      </div>
    </>
  );
};

export default CreateResumePage;
