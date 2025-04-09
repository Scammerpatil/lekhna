import { useUser } from "@/context/UserContext";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Experience = () => {
  const { user } = useUser();
  if (!user) return null;

  const [formData, setFormData] = useState(user);
  const [experience, setExperience] = useState({
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!experience.company || !experience.role || !experience.startDate) {
      alert("Please fill in required fields");
      return;
    }

    const updatedExperience = [...(formData.experience || [])];

    if (editIndex !== null) {
      updatedExperience[editIndex] = experience;
    } else {
      updatedExperience.push(experience);
    }

    const updatedForm = {
      ...formData,
      experience: updatedExperience,
    };

    setFormData(updatedForm);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Updating Experience...",
      success: "Experience Updated",
      error: "Something went wrong",
    });

    setExperience({
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    const exp = formData.experience[index];
    setExperience({
      ...exp,
      startDate: exp.startDate?.split?.("T")?.[0] || exp.startDate,
      endDate: exp.endDate?.split?.("T")?.[0] || exp.endDate,
    });
    setEditIndex(index);
    (document.getElementById("addExperience") as HTMLDialogElement).showModal();
  };

  const handleDelete = async (index: number) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    const updatedForm = {
      ...formData,
      experience: updatedExperience,
    };

    setFormData(updatedForm);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Deleting Entry...",
      success: "Deleted Successfully",
      error: "Failed to delete",
    });
  };

  return (
    <div className="w-full">
      <h1 className="uppercase text-3xl text-center">Experience</h1>

      {formData?.experience?.length > 0 ? (
        <ul className="overflow-x-auto w-full">
          {formData.experience.map((exp, index) => (
            <li
              key={index}
              className="text-base mt-6 border border-base-content p-4 rounded-lg flex justify-between items-center"
            >
              <>
                <strong>{exp.role}</strong> At {exp.company} - {exp.location}{" "}
                <br />
                {new Date(exp.startDate).toLocaleDateString("en-US")} to{" "}
                {exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString("en-US")
                  : "Present"}{" "}
                <br />
                <span className="text-sm">{exp.description}</span>
              </>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-outline btn-info"
                  onClick={() => handleEdit(index)}
                >
                  <IconPencil size={16} />
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleDelete(index)}
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-xl text-center mt-6">No Experience Found</div>
      )}

      <button
        className="btn btn-secondary w-full mt-6"
        onClick={() => {
          setEditIndex(null);
          setExperience({
            company: "",
            role: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          });
          (
            document.getElementById("addExperience") as HTMLDialogElement
          ).showModal();
        }}
      >
        <IconPlus size={24} /> Add New Experience
      </button>

      <dialog id="addExperience" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">
            {editIndex !== null ? "Edit Experience" : "Add Experience"}
          </h3>

          <input
            type="text"
            placeholder="Company"
            className="input input-bordered w-full mt-4"
            value={experience.company}
            onChange={(e) =>
              setExperience({ ...experience, company: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Role"
            className="input input-bordered w-full mt-4"
            value={experience.role}
            onChange={(e) =>
              setExperience({ ...experience, role: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full mt-4"
            value={experience.location}
            onChange={(e) =>
              setExperience({ ...experience, location: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered w-full mt-4"
            value={experience.startDate}
            onChange={(e) =>
              setExperience({ ...experience, startDate: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered w-full mt-4"
            value={experience.endDate}
            onChange={(e) =>
              setExperience({ ...experience, endDate: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full mt-4"
            value={experience.description}
            onChange={(e) =>
              setExperience({ ...experience, description: e.target.value })
            }
          />

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={
                  !experience.company ||
                  !experience.role ||
                  !experience.startDate
                }
              >
                {editIndex !== null ? "Update" : "Save"}
              </button>
              <button className="btn ml-2">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Experience;
