"use client";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/user";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import CircularProgress from "@/Components/CircularProgress";

const Settings = () => {
  const { user } = useUser();
  if (!user) return null;
  return <Profile user={user} />;
};

export default Settings;

const Profile = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    formData.profileImage || "/default-profile.png"
  );
  console.log("user", user);

  console.log("formData", formData);

  /*SUMMARY */
  const [summary, setSummary] = useState(user.summary || "");
  const [isSummaryEdit, setIsSummaryEdit] = useState(false);
  const [tempSummary, setTempSummary] = useState("");

  // Enable edit mode
  const handleEdit = () => {
    setTempSummary(summary);
    setIsSummaryEdit(true);
  };

  // Save summary
  const handleSave = () => {
    setSummary(tempSummary);
    setIsSummaryEdit(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsSummaryEdit(false);
    setTempSummary(summary);
  };

  // ACHIEVEMENTS
  const [achievements, setAchievements] = useState<string[]>(
    user.achievements || []
  );
  const [newAchievement, setNewAchievement] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    if (editIndex !== null) {
      const updatedAchievements = [...achievements];
      updatedAchievements[editIndex] = newAchievement;
      setAchievements(updatedAchievements);
    } else {
      setAchievements([...achievements, newAchievement]);
    }
    setNewAchievement("");
    setEditIndex(null);
    (document.getElementById("achievementDialog") as HTMLDialogElement).close();
  };
  const handleEditAchievement = (index: number) => {
    setNewAchievement(achievements[index]);
    setEditIndex(index);
    (
      document.getElementById("achievementDialog") as HTMLDialogElement
    ).showModal();
  };
  const handleDeleteAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  // CERTIFICATIONS
  const [certifications, setCertifications] = useState(
    user.certifications || []
  );
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuedBy: "",
    date: "",
  });
  const [editCertIndex, setEditCertIndex] = useState<number | null>(null);
  console.log("certifate", certifications);
  const handleAddCertification = () => {
    if (
      !newCertification.name.trim() ||
      !newCertification.issuedBy.trim() ||
      !newCertification.date
    )
      return;
    if (editCertIndex !== null) {
      const updatedCertifications = [...certifications];
      updatedCertifications[editCertIndex] = newCertification;
      setCertifications(updatedCertifications);
    } else {
      setCertifications([...certifications, newCertification]);
    }
    setNewCertification({ name: "", issuedBy: "", date: "" });
    setEditCertIndex(null);
    (
      document.getElementById("certificationDialog") as HTMLDialogElement
    ).close();
  };

  const handleEditCertification = (index: number) => {
    setNewCertification(certifications[index]);
    setEditCertIndex(index);
    (
      document.getElementById("certificationDialog") as HTMLDialogElement
    ).showModal();
  };
  const handleDeleteCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  //SOCIALS LINKS
  const [socialLinks, setSocialLinks] = useState(
    user.socialLinks || { linkedin: "", github: "", twitter: "", portfolio: "" }
  );

  const handleSocialLinkChange = (field: string, value: string) => {
    setSocialLinks({ ...socialLinks, [field]: value });
  };

  const handleUpdateSocialLinks = () => {
    (document.getElementById("socialLinksDialog") as HTMLDialogElement).close();
  };

  //EDUCATIONS
  const [education, setEducation] = useState(user.education || []);
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  const [isEduEditing, setIsEduEditing] = useState(false);
  const [editEduIndex, setEditEduIndex] = useState<number | null>(null);
  console.log("education", education);

  const handleAddEducation = () => {
    setEducation([...education, newEducation]);
    setNewEducation({
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
    });
    (document.getElementById("educationDialog") as HTMLDialogElement).close();
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const handleEditEducation = (index: number) => {
    setNewEducation(education[index]);
    setEditEduIndex(index);
    setIsEduEditing(true);
    (
      document.getElementById("educationDialog") as HTMLDialogElement
    ).showModal();
  };

  const handleUpdateEducation = () => {
    if (editEduIndex !== null) {
      const updatedEducation = [...education];
      updatedEducation[editEduIndex] = newEducation;
      setEducation(updatedEducation);
    }
    setIsEduEditing(false);
    setEditEduIndex(null);
    setNewEducation({
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
    });
    (document.getElementById("educationDialog") as HTMLDialogElement).close();
  };

  // EXPERINCE
  const [experience, setExperience] = useState(user.experience || []);
  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [isExpEditing, setIsExpEditing] = useState(false);
  const [editExpIndex, setEditExpIndex] = useState<number | null>(null);

  const handleEditExperience = (index: number) => {
    setNewExperience(experience[index]);
    setEditExpIndex(index);
    setIsExpEditing(true);
    (
      document.getElementById("experienceDialog") as HTMLDialogElement
    ).showModal();
  };

  const handleUpdateExperience = () => {
    if (editExpIndex !== null) {
      const updatedExperience = [...experience];
      updatedExperience[editExpIndex] = newExperience;
      setExperience(updatedExperience);
    }
    setIsExpEditing(false);
    setEditExpIndex(null);
    setNewExperience({
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    (document.getElementById("experienceDialog") as HTMLDialogElement).close();
  };

  const handleAddExperience = () => {
    setExperience([...experience, newExperience]);
    setNewExperience({
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    (document.getElementById("experienceDialog") as HTMLDialogElement).close();
  };

  const handleDeleteExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  // PROJECTS
  const [projects, setProjects] = useState(user.projects || []);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: [],
    links: {},
  });
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editProjectIndex, setEditProjectIndex] = useState<number | null>(null);

  const handleEditProject = (index?: number) => {
    if (index !== undefined) {
      setNewProject({ ...projects[index] });
      setIsEditingProject(true);
      setEditProjectIndex(index);
    } else {
      setNewProject({
        title: "",
        description: "",
        technologies: [],
        links: {},
      });
      setIsEditingProject(false);
      setEditProjectIndex(null);
    }
    (document.getElementById("projectDialog") as HTMLDialogElement).showModal();
  };

  // Handle saving a new or edited project
  const handleSaveProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim())
      return alert("Title and Description are required!");

    if (isEditingProject && editProjectIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editProjectIndex] = newProject;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, newProject]);
    }
    (document.getElementById("projectDialog") as HTMLDialogElement).close();
  };

  // Handle project deletion
  const handleDeleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // SKILLS
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [newSkillInput, setNewSkillInput] = useState("");

  // Handle adding skills from comma-separated input
  const handleAddSkills = () => {
    if (!newSkillInput.trim()) return;

    const newSkillsArray = newSkillInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");
    setSkills([...skills, ...newSkillsArray]);
    setNewSkillInput(""); // Clear input
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }
    const updatedData = {
      ...formData,
      achievements,
      certifications,
      socialLinks,
      education,
      experience,
      projects,
      skills,
      summary,
    };
    console.log("submit", updatedData);

    const response = axios.put("/api/user/update", { updatedData });
    toast.promise(response, {
      loading: "Updating User...",
      success: "User Update Successfully",
      error: "Something went wrong",
    });
    setIsEditing(false);
  };

  return (
    <>
      {/* Profile Image */}
      <div className="my-6 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <img
            src={imagePreview}
            alt="Profile Pic"
            className="rounded-full h-40 w-40 object-cover border border-primary"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered"
            disabled={!isEditing}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">ATS Score</h2>
          <CircularProgress percentage={formData.atsScore || 0} />
        </div>
      </div>

      {/* Personal Details */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
        <hr className="mb-4" />
        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
            {/* Name */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="fullName"
              >
                Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Full Name"
                disabled={!isEditing}
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Mobile Number"
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email || ""}
                readOnly
                className="input input-bordered w-full text-base-content"
                placeholder="Mobile Number"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <hr className="mb-4" />
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          <div className="flex flex-col space-y-3">
            {isSummaryEdit ? (
              <textarea
                value={tempSummary}
                onChange={(e) => setTempSummary(e.target.value)}
                className="textarea textarea-bordered w-full text-base-content"
                placeholder="Tell something about yourself..."
              />
            ) : (
              <p className="text-base-content p-3 bg-base-100 rounded-lg border border-gray-200 shadow-sm">
                {summary || (
                  <span className="text-gray-500">No summary added yet.</span>
                )}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {isSummaryEdit ? (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleSave}
                  >
                    💾 Save
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={handleCancel}
                  >
                    ✖ Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={handleEdit}>
                  ✏ Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Achievements</h2>
        <hr className="mb-4" />
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          {achievements.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500 mb-4">No achievements added yet.</p>
              <button
                className="btn btn-primary w-full"
                onClick={() =>
                  (
                    document.getElementById(
                      "achievementDialog"
                    ) as HTMLDialogElement
                  ).showModal()
                }
              >
                + Add Achievement
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-base-100 p-3 rounded-lg border border-gray-200 shadow-sm"
                >
                  <span className="text-sm">{achievement}</span>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleEditAchievement(index)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-ghost text-error"
                      onClick={() => handleDeleteAchievement(index)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-outline btn-primary w-full"
                onClick={() =>
                  (
                    document.getElementById(
                      "achievementDialog"
                    ) as HTMLDialogElement
                  ).showModal()
                }
              >
                + Add Achievement
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Achievement Dialog */}
      <dialog id="achievementDialog" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            {editIndex !== null ? "Edit" : "Add"} Achievement
          </h3>
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
            placeholder="Enter Achievement"
          />
          <button
            className="btn mt-3 btn-primary w-full"
            onClick={handleAddAchievement}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </dialog>

      {/* Certifications Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Certifications</h2>
        <hr className="mb-4" />
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          {certifications.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500 mb-4">No certifications added yet.</p>
              <button
                className="btn btn-primary w-full"
                onClick={() =>
                  (
                    document.getElementById(
                      "certificationDialog"
                    ) as HTMLDialogElement
                  ).showModal()
                }
              >
                + Add Certification
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-base-100 p-3 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold">{cert.name}</p>
                    <p className="text-xs text-gray-500">
                      Issued by {cert.issuedBy} on{" "}
                      {new Date(cert.date).toLocaleDateString()}
                    </p>
                    {/* {new Date(edu.startDate).toLocaleDateString()} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "Present"} */}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleEditCertification(index)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-ghost text-error"
                      onClick={() => handleDeleteCertification(index)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-outline btn-primary w-full"
                onClick={() =>
                  (
                    document.getElementById(
                      "certificationDialog"
                    ) as HTMLDialogElement
                  ).showModal()
                }
              >
                + Add Certification
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Certification Dialog */}
      <dialog id="certificationDialog" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            {editCertIndex !== null ? "Edit" : "Add"} Certification
          </h3>
          <input
            type="text"
            placeholder="Certification Name"
            value={newCertification.name}
            onChange={(e) =>
              setNewCertification({ ...newCertification, name: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />
          <input
            type="text"
            placeholder="Issued By"
            value={newCertification.issuedBy}
            onChange={(e) =>
              setNewCertification({
                ...newCertification,
                issuedBy: e.target.value,
              })
            }
            className="input input-bordered w-full mt-2"
          />
          <input
            type="date"
            value={newCertification.date}
            onChange={(e) =>
              setNewCertification({ ...newCertification, date: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />
          <button
            className="btn mt-3 btn-primary w-full"
            onClick={handleAddCertification}
          >
            {editCertIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </dialog>

      {/* Social Links Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Social Links</h2>
        <hr className="mb-4" />
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          <div className="space-y-3">
            {Object.entries(socialLinks).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between bg-base-100 p-3 rounded-lg border border-gray-200 shadow-sm"
              >
                <span className="text-sm font-medium capitalize">{key}</span>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-blue-500 text-sm ${
                    value ? "" : "text-gray-400"
                  }`}
                >
                  {value || "Not Added"}
                </a>
              </div>
            ))}
            <button
              className="btn btn-outline btn-primary w-full"
              onClick={() =>
                (
                  document.getElementById(
                    "socialLinksDialog"
                  ) as HTMLDialogElement
                ).showModal()
              }
            >
              ✏️ Edit Social Links
            </button>
          </div>
        </div>
      </div>

      {/* Social Links Dialog */}
      <dialog id="socialLinksDialog" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">Edit Social Links</h3>
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={socialLinks.linkedin}
            onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
            className="input input-bordered w-full mt-2"
          />
          <input
            type="url"
            placeholder="GitHub URL"
            value={socialLinks.github}
            onChange={(e) => handleSocialLinkChange("github", e.target.value)}
            className="input input-bordered w-full mt-2"
          />
          <input
            type="url"
            placeholder="Twitter URL"
            value={socialLinks.twitter}
            onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
            className="input input-bordered w-full mt-2"
          />
          <input
            type="url"
            placeholder="Portfolio URL"
            value={socialLinks.portfolio}
            onChange={(e) =>
              handleSocialLinkChange("portfolio", e.target.value)
            }
            className="input input-bordered w-full mt-2"
          />
          <button
            className="btn mt-3 btn-primary w-full"
            onClick={handleUpdateSocialLinks}
          >
            Save
          </button>
        </div>
      </dialog>

      {/* Education Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Education</h2>
        <hr className="mb-4" />
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          <div className="space-y-3">
            {education.length > 0 ? (
              education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-base-100 p-4 rounded-lg border border-gray-300 shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {edu.institution} -{" "}
                      {edu.location || "Location not provided"}
                    </h3>
                    <h4 className="text-sm text-gray-700">{edu.degree}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(edu.startDate).toLocaleDateString()} -{" "}
                      {edu.endDate
                        ? new Date(edu.endDate).toLocaleDateString()
                        : "Present"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleEditEducation(index)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteEducation(index)}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education details added yet.</p>
            )}
            <button
              className="btn btn-outline btn-primary w-full"
              onClick={() =>
                (
                  document.getElementById(
                    "educationDialog"
                  ) as HTMLDialogElement
                ).showModal()
              }
            >
              ➕ Add Education
            </button>
          </div>
        </div>
      </div>

      {/* Education Dialog (Add/Edit) */}
      <dialog id="educationDialog" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            {isEduEditing ? "Edit Education" : "Add Education"}
          </h3>
          <input
            type="text"
            placeholder="Institution"
            value={newEducation.institution}
            onChange={(e) =>
              setNewEducation({ ...newEducation, institution: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />
          <input
            type="text"
            placeholder="Degree"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />
          <input
            type="text"
            placeholder="Location (Optional)"
            value={newEducation.location}
            onChange={(e) =>
              setNewEducation({ ...newEducation, location: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />
          <label className="block mt-2">Start Date</label>
          <input
            type="date"
            value={newEducation.startDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, startDate: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <label className="block mt-2">End Date (Optional)</label>
          <input
            type="date"
            value={newEducation.endDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, endDate: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <button
            className="btn mt-3 btn-primary w-full"
            onClick={isEduEditing ? handleUpdateEducation : handleAddEducation}
          >
            {isEduEditing ? "Update" : "Save"}
          </button>
        </div>
      </dialog>

      {/* Experience Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Experience</h2>
        <hr className="mb-4" />
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          <div className="space-y-3">
            {experience.length > 0 ? (
              experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-base-100 p-4 rounded-lg border border-gray-300 shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                >
                  <div className="w-full">
                    <h3 className="text-lg font-semibold">
                      {exp.company} - {exp.location || "Location not provided"}
                    </h3>
                    <h4 className="text-sm text-gray-400">{exp.role}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(exp.startDate).toLocaleDateString()} -{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).toLocaleDateString()
                        : "Present"}
                    </p>
                    {exp.description && (
                      <p className="text-sm mt-1">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <button
                      className="btn btn-xs btn-warning flex items-center gap-1"
                      onClick={() => handleEditExperience(index)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error flex items-center gap-1"
                      onClick={() => handleDeleteExperience(index)}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No experience details added yet.</p>
            )}
            <button
              className="btn btn-outline btn-primary w-full"
              onClick={() =>
                (
                  document.getElementById(
                    "experienceDialog"
                  ) as HTMLDialogElement
                ).showModal()
              }
            >
              ➕ Add Experience
            </button>
          </div>
        </div>
      </div>

      {/* Experience Dialog (Add/Edit) */}
      <dialog id="experienceDialog" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            {isExpEditing ? "Edit Experience" : "Add Experience"}
          </h3>
          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />
          <input
            type="text"
            placeholder="Role"
            value={newExperience.role}
            onChange={(e) =>
              setNewExperience({ ...newExperience, role: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />
          <input
            type="text"
            placeholder="Location (Optional)"
            value={newExperience.location}
            onChange={(e) =>
              setNewExperience({ ...newExperience, location: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />
          <label className="block mt-2">Start Date</label>
          <input
            type="date"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, startDate: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <label className="block mt-2">End Date (Optional)</label>
          <input
            type="date"
            value={newExperience.endDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, endDate: e.target.value })
            }
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Description (Optional)"
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                description: e.target.value,
              })
            }
            className="textarea textarea-bordered w-full mt-2"
          ></textarea>
          <button
            className="btn mt-3 btn-primary w-full"
            onClick={
              isExpEditing ? handleUpdateExperience : handleAddExperience
            }
          >
            {isExpEditing ? "Update" : "Save"}
          </button>
        </div>
      </dialog>

      {/* Projects Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Projects</h2>
        <hr className="mb-4" />
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          <div className="space-y-3">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-base-100 p-4 rounded-lg border border-gray-300 shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                >
                  <div className="w-full">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="badge badge-outline badge-primary text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-blue-500">
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          🔗 GitHub
                        </a>
                      )}
                      {project.links?.liveDemo && (
                        <a
                          href={project.links.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          🚀 Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <button
                      className="btn btn-xs btn-warning flex items-center gap-1"
                      onClick={() => handleEditProject(index)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error flex items-center gap-1"
                      onClick={() => handleDeleteProject(index)}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No projects added yet.</p>
            )}
            <button
              className="btn btn-outline btn-primary w-full"
              onClick={() =>
                (
                  document.getElementById("projectDialog") as HTMLDialogElement
                ).showModal()
              }
            >
              ➕ Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Project Dialog (Modal) */}
      <dialog id="projectDialog" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            {isEditingProject ? "Edit Project" : "Add Project"}
          </h3>

          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="input input-bordered w-full mt-2"
          />

          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="textarea textarea-bordered w-full mt-2"
          ></textarea>

          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={newProject.technologies.join(", ")}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                technologies: e.target.value
                  .split(",")
                  .map((tech) => tech.trim()),
              })
            }
            className="input input-bordered w-full mt-2"
          />

          <input
            type="text"
            placeholder="GitHub Link (Optional)"
            value={newProject.links?.github || ""}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                links: { ...newProject.links, github: e.target.value },
              })
            }
            className="input input-bordered w-full mt-2"
          />

          <input
            type="text"
            placeholder="Live Demo Link (Optional)"
            value={newProject.links?.liveDemo || ""}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                links: { ...newProject.links, liveDemo: e.target.value },
              })
            }
            className="input input-bordered w-full mt-2"
          />

          <button
            className="btn mt-3 btn-primary w-full"
            onClick={handleSaveProject}
          >
            {isEditingProject ? "Update" : "Save"}
          </button>
        </div>
      </dialog>

      {/* Skills section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Skills</h2>
        <hr className="mb-4" />
        <div className="bg-base-200 p-4 rounded-lg shadow-md">
          <div className="space-y-3">
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="badge badge-outline badge-primary text-xs flex items-center gap-1"
                  >
                    {skill}
                    <button
                      className="ml-1 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills added yet.</p>
            )}

            {/* Skill Input */}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter skills (comma-separated)"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                className="input input-bordered flex-grow"
              />
              <button className="btn btn-primary" onClick={handleAddSkills}>
                ➕ Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex items-center justify-center">
        <button
          className="btn btn-primary btn-outline w-5/6 mx-auto"
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) handleSubmit();
          }}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </>
  );
};
