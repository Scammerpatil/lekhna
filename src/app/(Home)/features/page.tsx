import React from "react";

type Feature = {
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    title: "AI-Powered Suggestions",
    description: "Get intelligent suggestions to improve your resume instantly.",
    image: "/images/ai-suggestions.png",
  },
  {
    title: "Customizable Templates",
    description: "Choose from a variety of professional resume templates.",
    image: "/images/custom-templates.png",
  },
  {
    title: "ATS-Friendly Format",
    description: "Ensure your resume passes through Applicant Tracking Systems with ease.",
    image: "/images/ats-friendly.png",
  },
  {
    title: "Easy Export",
    description: "Download your resume in PDF or DOCX format effortlessly.",
    image: "/images/easy-export.png",
  },
  {
    title: "Real-Time Editing",
    description: "Edit and see changes instantly with our live preview feature.",
    image: "/images/real-time-editing.png",
  },
  {
    title: "Secure Cloud Storage",
    description: "Save your resumes securely and access them anytime, anywhere.",
    image: "/images/secure-storage.png",
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <section className="bg-base-200 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-base-content mb-6">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-xl p-6 flex flex-col items-center">
              <img src={feature.image} alt={feature.title} className="w-32 h-32 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-base-content/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesPage;
