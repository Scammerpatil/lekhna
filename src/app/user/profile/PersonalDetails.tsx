import { useUser } from "@/context/UserContext";
import { IconCloudUpload } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const PersonalDetails = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  if (!user) return null;
  const [formData, setFormData] = useState(user);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData.name) {
      toast.error("Name is required for images");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: formData.name,
        folderName: "profileImages",
      });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            profileImage: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }
    const response = axios.patch("/api/user/update", { formData });
    toast.promise(response, {
      loading: "Updating User...",
      success: "User Update Successfully",
      error: "Something went wrong",
    });
    setIsEditing(false);
  };
  const handleGenerateWithAI = async () => {
    const response = axios.post("/api/generate-text/summary", { user });

    toast.promise(response, {
      loading: "Generating...",
      success: (data) => {
        const suggestions = data.data.summary;
        console.log(data.data);
        setAiSuggestions(suggestions);
        (document.getElementById("bio") as HTMLDialogElement).showModal();
        return "Generated";
      },
      error: "Generation Failed",
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4">
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-base-200 border border-base-content rounded-lg shadow-sm 2xl:col-span-2">
            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <img
                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                src={user.profileImage}
                alt={user.name}
              />
              <div>
                <h3 className="mb-1 text-xl font-bold text-base-content">
                  Profile picture
                </h3>
                <div className="mb-4 text-sm text-base-content/50">
                  JPG Max size of 800K
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="profileImageInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                  <button
                    className="btn btn-primary flex items-center space-x-2"
                    disabled={!isEditing}
                    onClick={() =>
                      document.getElementById("profileImageInput")?.click()
                    }
                  >
                    <IconCloudUpload size={20} />
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 mb-4 bg-base-300 border border-base-content rounded-lg shadow-sm 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold">Social Links</h3>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-base-content">
                LinkedIn
              </label>
              <input
                className="input input-primary w-full"
                value={user.socialLinks?.linkedin}
                disabled={!isEditing}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...formData.socialLinks,
                      linkedin: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-base-content">
                Github
              </label>
              <input
                className="input input-primary w-full"
                value={user.socialLinks?.github}
                disabled={!isEditing}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...formData.socialLinks,
                      github: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-base-content">
                Twitter
              </label>
              <input
                className="input input-primary w-full"
                value={user.socialLinks?.twitter}
                disabled={!isEditing}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...formData.socialLinks,
                      twitter: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-base-content">
                Portfolio
              </label>
              <input
                className="input input-primary w-full"
                value={user.socialLinks?.portfolio}
                disabled={!isEditing}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...formData.socialLinks,
                      portfolio: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-8 mb-4 bg-base-300 border border-base-content rounded-lg shadow-sm 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold text-base-content">
              General information
            </h3>
            <div className="grid grid-cols-8 gap-6 w-full">
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-base-content"
                >
                  Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={formData.name || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  disabled={!isEditing}
                  className="input input-primary w-full"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="mobileNumber"
                  className="block mb-2 text-sm font-medium text-base-content"
                >
                  Mobile Number <span className="text-error">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  value={formData.phone || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                  }}
                  disabled={!isEditing}
                  className="input input-primary w-full"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-12">
                <label className="block text-sm font-medium text-base-content">
                  Email <span className="text-error">*</span>
                </label>
                <input
                  value={formData.email || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  disabled={!isEditing}
                  className="input input-primary w-full"
                  required
                />
              </div>
              <div className="col-span-12 sm:col-span-12">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-base-content"
                >
                  Summary <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData.summary || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      summary: e.target.value,
                    });
                  }}
                  disabled={!isEditing}
                  className="textarea textarea-primary w-full"
                  required
                />
                <button
                  className="btn btn-secondary btn-outline w-full"
                  onClick={handleGenerateWithAI}
                  disabled={!isEditing}
                >
                  Generate Using AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          className="btn btn-primary btn-outline mx-auto w-full"
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) handleSubmit();
          }}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
      <dialog id="bio" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">AI Generated Summary</h3>
          <p className="py-4">Select the summary you want to use</p>
          {aiSuggestions.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold mb-2">AI Suggestions:</p>
              <ul className="space-y-2">
                {aiSuggestions.map((desc, idx) => (
                  <li
                    key={idx}
                    className={`p-3 border rounded cursor-pointer hover:bg-base-200 ${
                      formData.summary === desc
                        ? "bg-primary text-primary-content"
                        : ""
                    }`}
                    onClick={() => setFormData({ ...formData, summary: desc })}
                  >
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};
export default PersonalDetails;
