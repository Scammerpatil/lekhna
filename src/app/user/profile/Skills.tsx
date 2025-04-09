"use client";
import { useUser } from "@/context/UserContext";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Skills = () => {
  const { user } = useUser();
  const [newSkill, setNewSkill] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState(user);

  if (!user) return null;

  const handleSubmit = async () => {
    const updatedSkills = [...(user.skills || [])];

    if (editIndex !== null) {
      updatedSkills[editIndex] = newSkill;
    } else {
      updatedSkills.push(newSkill);
    }

    const updatedForm = {
      ...formData,
      skills: updatedSkills,
    };

    setFormData(updatedForm);
    setNewSkill("");
    setEditIndex(null);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Saving skill...",
      success: "Skill saved successfully!",
      error: "Failed to save skill",
    });
  };

  const handleEdit = (index: number) => {
    setNewSkill(user.skills?.[index] || "");
    setEditIndex(index);
    (document.getElementById("addSkill") as HTMLDialogElement).showModal();
  };

  const handleDelete = async (index: number) => {
    const updatedSkills = [...(user.skills || [])];
    updatedSkills.splice(index, 1);

    const updatedForm = {
      ...formData,
      skills: updatedSkills,
    };

    setFormData(updatedForm);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Deleting skill...",
      success: "Skill deleted successfully",
      error: "Failed to delete skill",
    });
  };

  return (
    <div className="w-full">
      <h1 className="uppercase text-3xl text-center">Skills</h1>
      {user?.skills?.length! > 0 ? (
        <ul className="mt-6 space-y-3">
          {user?.skills?.map((skill, index) => (
            <li
              key={index}
              className="text-base border border-base-content p-4 rounded-lg flex justify-between items-center"
            >
              <span>{skill}</span>
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => handleEdit(index)}
                >
                  <IconPencil size={20} />
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => handleDelete(index)}
                >
                  <IconTrash size={20} className="text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-xl text-center mt-6">No Skills Added</div>
      )}
      <button
        className="btn btn-secondary w-full mt-6"
        onClick={() => {
          setNewSkill("");
          setEditIndex(null);
          (
            document.getElementById("addSkill") as HTMLDialogElement
          ).showModal();
        }}
      >
        <IconPlus size={24} /> Add New Skill
      </button>

      {/* Modal */}
      <dialog id="addSkill" className="modal">
        <div className="modal-box w-11/12 max-w-md">
          <h3 className="font-bold text-lg">
            {editIndex !== null ? "Edit" : "Add"} Skill
          </h3>
          <input
            type="text"
            placeholder="e.g., JavaScript"
            className="input input-bordered w-full mt-4"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success"
                onClick={() => handleSubmit()}
                disabled={!newSkill.trim()}
              >
                Save
              </button>
              <button className="btn ml-2">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Skills;
