import { useUser } from "@/context/UserContext";
import { IconPlus, IconTrash, IconPencil } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Education = () => {
  const { user } = useUser();
  if (!user) return null;

  const [formData, setFormData] = useState(user);
  const [education, setEducation] = useState({
    institution: "",
    degree: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    const updatedEducation = [...(formData.education || [])];
    if (editIndex !== null) {
      updatedEducation[editIndex] = education;
    } else {
      updatedEducation.push(education);
    }

    const updatedForm = {
      ...formData,
      education: updatedEducation,
    };

    setFormData(updatedForm);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Updating User...",
      success: "User Updated Successfully",
      error: "Something went wrong",
    });

    setEducation({
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    const edu = formData.education[index];
    setEducation({
      ...edu,
      startDate: edu.startDate?.split?.("T")?.[0] || edu.startDate,
      endDate: edu.endDate?.split?.("T")?.[0] || edu.endDate,
    });
    setEditIndex(index);
    (document.getElementById("addEducation") as HTMLDialogElement).showModal();
  };

  const handleDelete = async (index: number) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    const updatedForm = {
      ...formData,
      education: updatedEducation,
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
      <h1 className="uppercase text-3xl text-center">Education</h1>
      {formData?.education?.length! > 0 ? (
        <ul className="overflow-x-auto w-full">
          {formData.education.map((edu, index) => (
            <li
              key={index}
              className="text-base mt-6 border border-base-content p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                {edu.institution} - {edu.degree} - {edu.location} -{" "}
                {new Date(edu.startDate).toLocaleDateString("en-US")} to{" "}
                {edu.endDate
                  ? new Date(edu.endDate).toLocaleDateString("en-US")
                  : "Present"}
              </div>
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
        <div className="text-xl text-center mt-6">No Education Found</div>
      )}

      <button
        className="btn btn-secondary w-full mt-6"
        onClick={() => {
          setEditIndex(null);
          setEducation({
            institution: "",
            degree: "",
            location: "",
            startDate: "",
            endDate: "",
          });
          (
            document.getElementById("addEducation") as HTMLDialogElement
          ).showModal();
        }}
      >
        <IconPlus size={24} /> Add New Education
      </button>

      <dialog id="addEducation" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">
            {editIndex !== null ? "Edit Education" : "Add Education"}
          </h3>

          <input
            type="text"
            placeholder="Institution"
            className="input input-bordered w-full mt-4"
            value={education.institution}
            onChange={(e) =>
              setEducation({ ...education, institution: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Degree"
            className="input input-bordered w-full mt-4"
            value={education.degree}
            onChange={(e) =>
              setEducation({ ...education, degree: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full mt-4"
            value={education.location}
            onChange={(e) =>
              setEducation({ ...education, location: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered w-full mt-4"
            value={education.startDate}
            onChange={(e) =>
              setEducation({ ...education, startDate: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered w-full mt-4"
            value={education.endDate}
            onChange={(e) =>
              setEducation({ ...education, endDate: e.target.value })
            }
          />

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={
                  !education.institution ||
                  !education.degree ||
                  !education.startDate
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

export default Education;
