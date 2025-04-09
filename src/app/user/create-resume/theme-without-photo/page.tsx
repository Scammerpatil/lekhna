"use client";
import { useUser } from "@/context/UserContext";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconLink,
  IconMail,
  IconPhone,
  IconSitemap,
} from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";

const CreateResumeWithThemeNoPhoto = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const theme = searchParams.get("id");

  const handlePrint = async () => {
    const divContent = document.getElementById("resume")?.innerHTML;
    localStorage.setItem("resume", divContent!);
    localStorage.setItem("resume-theme", theme!);
    window.open("/resume", "_blank");
  };

  return (
    <>
      <h1 className="text-4xl text-center uppercase font-bold mb-4">
        Your resume with theme: {theme}
      </h1>
      <div
        data-theme={theme}
        className="mx-auto border border-base-content shadow-lg"
        id="resume"
      >
        <div className="flex flex-row">
          {/* Left Panel */}
          <div className="w-5/12 bg-base-300 flex flex-col items-center p-4 h-[100vh]">
            <div className="w-full flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-semibold border-b border-base-content pb-1">
                  CONTACT
                </h2>
                <p className="flex items-center gap-2">
                  <IconPhone size={18} /> {user?.phone}
                </p>
                <p className="flex items-center gap-2">
                  <IconMail size={18} className="text-primary" />
                  <a href={`mailto:${user?.email}`} className="text-primary">
                    {user?.email}
                  </a>
                </p>
                {user?.socialLinks?.linkedin && (
                  <p className="flex items-center gap-2">
                    <IconBrandLinkedin size={18} className="text-primary" />
                    <a
                      href={user?.socialLinks?.linkedin}
                      className="text-primary"
                    >
                      LinkedIn
                    </a>
                  </p>
                )}
                {user?.socialLinks?.github && (
                  <p className="flex items-center gap-2">
                    <IconBrandGithub size={18} className="text-primary" />
                    <a
                      href={user?.socialLinks?.github}
                      className="text-primary"
                    >
                      Github
                    </a>
                  </p>
                )}
                {user?.socialLinks?.portfolio && (
                  <p className="flex items-center gap-2">
                    <IconSitemap size={18} className="text-primary" />
                    <a
                      href={user?.socialLinks?.portfolio}
                      className="text-primary"
                    >
                      Portfolio
                    </a>
                  </p>
                )}
                {user?.socialLinks?.twitter && (
                  <p className="flex items-center gap-2">
                    <IconBrandTwitter size={18} className="text-primary" />
                    <a
                      href={user?.socialLinks?.twitter}
                      className="text-primary"
                    >
                      Twitter
                    </a>
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold border-b border-base-content pb-1">
                  SKILLS
                </h2>
                {user?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-primary text-primary-content text-xs mr-1 mb-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-semibold border-b border-base-content pb-1">
                  EDUCATION
                </h2>
                {user?.education?.map((edu, index) => (
                  <p key={index} className="text-sm">
                    <span className="font-bold">{edu.institution}</span>
                    <br />
                    {edu.degree}
                    <br />
                    {new Date(edu.startDate).toLocaleDateString()} -{" "}
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString()
                      : "Present"}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-7/12 bg-base-100 p-6">
            <h1 className="uppercase text-3xl font-bold text-base-content">
              {user?.name}
            </h1>
            <h3 className="mt-2 text-xl text-base-content/80">
              Software Engineer
            </h3>

            <h2 className="mt-4 text-2xl font-bold text-base-content border-b border-base-content">
              About Me
            </h2>
            <p className="text-sm text-base-content/80">
              {user?.summary ||
                "An experienced software developer with expertise in modern web technologies."}
            </p>

            <h2 className="mt-4 text-2xl font-bold border-b border-base-content">
              Experience
            </h2>
            {user?.experience?.map((exp, index) => (
              <div key={index} className="mt-2">
                <h3 className="text-lg font-semibold">
                  {exp.role} at {exp.company}
                </h3>
                <p className="text-sm text-base-content/60">
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString()
                    : "Present"}
                </p>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}

            <h2 className="mt-4 text-2xl font-bold border-b border-base-content">
              Projects
            </h2>
            {user?.projects?.map((project, index) => (
              <div key={index} className="mt-2">
                <h3 className="text-lg font-semibold flex items-center justify-between">
                  {project.title}
                  <span className="flex gap-2">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        className="btn btn-primary"
                      >
                        <IconBrandGithub size={18} />
                      </a>
                    )}
                    {project.links?.liveDemo && (
                      <a
                        href={project.links.liveDemo}
                        className="btn btn-secondary"
                      >
                        <IconLink size={18} />
                      </a>
                    )}
                  </span>
                </h3>
                <p className="text-sm">{project.description}</p>
                <p className="text-sm italic">
                  Tech Stack: {project.technologies.join(", ")}
                </p>
              </div>
            ))}

            <h2 className="mt-4 text-2xl font-bold border-b border-base-content">
              Achievements
            </h2>
            {user?.achievements?.length! > 0 && (
              <div className="mt-2">
                <ul className="list-disc ml-5 text-base-content text-sm">
                  {user?.achievements?.map((achieve, index) => (
                    <li key={index}>{achieve}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button onClick={handlePrint} className="btn btn-primary btn-outline">
          Print Resume
        </button>
      </div>
    </>
  );
};

export default CreateResumeWithThemeNoPhoto;
