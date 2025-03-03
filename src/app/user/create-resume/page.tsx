"use client";
import { useUser } from "@/context/UserContext";
import ResumePDF from "@/components/Resume";
import { PDFDownloadLink } from "@react-pdf/renderer";

const CreateResumePage = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl text-center uppercase font-bold mb-4">
        Choose a template
      </h1>

      {/* Resume Preview */}
      <div className="my-4">
        <ResumePDF user={user} />
      </div>

      {/* Download Button */}
      <PDFDownloadLink
        document={<ResumePDF user={user} />}
        fileName="resume.pdf"
      >
        {({ loading }) => (
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
            {loading ? "Generating..." : "Download Resume (PDF)"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default CreateResumePage;
