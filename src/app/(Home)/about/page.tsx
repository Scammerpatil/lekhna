import { IconCheck } from "@tabler/icons-react";

export default function About() {
  return (
    <section className="bg-base-200 flex items-center justify-center py-16 px-6">
      <div className="max-w-4xl text-center">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          About <span className="text-secondary">Lekhna AI</span>
        </h1>
        <p className="text-xl text-base-content/70 font-medium">
          Your Smart Resume Builder – Crafted to Help You Stand Out!
        </p>

        {/* Main Content */}
        <div className="mt-10 p-8 bg-base-100 shadow-xl rounded-2xl">
          <p className="text-lg text-base-content/80 leading-relaxed">
            Lekhna AI is an intelligent resume builder designed to help job seekers 
            create professional and ATS-friendly resumes effortlessly. With AI-powered 
            suggestions and customizable templates, Lekhna AI ensures that your resume 
            stands out in the competitive job market.
          </p>

          {/* Key Features */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-secondary mb-4">Key Features</h2>
            <ul className="space-y-3 text-left mx-auto max-w-2xl">
              {[
                "AI-powered content suggestions for each resume section",
                "Multiple customizable resume templates",
                "ATS-friendly formatting to pass applicant tracking systems",
                "Easy-to-use drag-and-drop editor",
                "Real-time preview of your resume",
                "Download your resume as PDF or share it online",
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-lg text-base-content/80">
                  <IconCheck className="text-primary mr-2" size={24} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final Call to Action */}
        <p className="mt-8 text-lg text-base-content/80">
          Whether you're a fresh graduate or an experienced professional, Lekhna AI 
          helps you craft a resume that truly reflects your skills and achievements.
        </p>
      </div>
    </section>
  );
}
