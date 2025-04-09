import { useUser } from "@/context/UserContext";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Achievement = () => {
  const { user } = useUser();
  const [rawAchievement, setRawAchievement] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  if (!user) return null;
  const [formData, setFormData] = useState(user);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    let updatedAchievements = [...(user.achievements || [])];

    if (editIndex !== null) {
      updatedAchievements[editIndex] = selectedSuggestion;
    } else {
      updatedAchievements.push(selectedSuggestion);
    }

    const updatedForm = {
      ...formData,
      achievements: updatedAchievements,
    };

    setFormData(updatedForm);
    setRawAchievement("");
    setSelectedSuggestion("");
    setEditIndex(null);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Updating User...",
      success: "User Update Successfully",
      error: "Something went wrong",
    });
  };

  const handleGenerateWithAI = async () => {
    try {
      const response = axios.post("/api/generate-text/achievement", {
        rawAchievement,
      });
      toast.promise(response, {
        loading: "Generating...",
        success: (data) => {
          setAiSuggestions(data.data.achievements);
          return "AI Suggestions Generated";
        },
        error: (error) => {
          console.error(error);
          return "Error generating suggestions";
        },
      });
    } catch (error) {
      console.error("Error generating suggestions:", error);
    }
  };

  const handleEdit = (index: number) => {
    const existing = user.achievements?.[index];
    setRawAchievement(existing || "");
    setSelectedSuggestion(existing || "");
    setEditIndex(index);
    (
      document.getElementById("addAchievement") as HTMLDialogElement
    ).showModal();
  };

  const handleDelete = async (index: number) => {
    const updatedAchievements = [...(user.achievements || [])];
    updatedAchievements.splice(index, 1);

    const updatedForm = {
      ...formData,
      achievements: updatedAchievements,
    };

    setFormData(updatedForm);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Deleting...",
      success: "Deleted Successfully",
      error: "Delete Failed",
    });
  };

  return (
    <div className="w-full">
      <h1 className="uppercase text-3xl text-center">Achievement</h1>
      {user?.achievements?.length! > 0 ? (
        <ul className="overflow-x-auto w-full">
          {user?.achievements?.map((achievement, index) => (
            <li
              key={index}
              className="text-base mt-6 border border-base-content p-6 rounded-lg flex justify-between items-start gap-4"
            >
              <span className="flex-1">{achievement}</span>
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
        <div className="text-xl text-center mt-6">No Achievements Found</div>
      )}
      <button
        className="btn btn-secondary w-full mt-6"
        onClick={() => {
          setRawAchievement("");
          setSelectedSuggestion("");
          setEditIndex(null);
          (
            document.getElementById("addAchievement") as HTMLDialogElement
          ).showModal();
        }}
      >
        <IconPlus size={24} /> Add New Achievement
      </button>

      {/* Modal */}
      <dialog id="addAchievement" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">
            {editIndex !== null ? "Edit" : "Add"} Achievement
          </h3>

          <textarea
            placeholder="Describe your achievement in your own words..."
            className="textarea textarea-bordered w-full mt-4"
            rows={4}
            value={rawAchievement}
            onChange={(e) => setRawAchievement(e.target.value)}
          />

          {selectedSuggestion && (
            <textarea
              placeholder="Selected AI Suggestion"
              className="textarea textarea-bordered w-full mt-4"
              rows={4}
              value={selectedSuggestion}
              onChange={(e) => setSelectedSuggestion(e.target.value)}
            />
          )}

          <button
            className="btn btn-primary mt-4"
            onClick={handleGenerateWithAI}
          >
            Generate with AI
          </button>

          {aiSuggestions.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold mb-2">AI Suggestions:</p>
              <ul className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`p-3 border rounded cursor-pointer hover:bg-base-200 ${
                      selectedSuggestion === suggestion
                        ? "bg-primary text-primary-content"
                        : ""
                    }`}
                    onClick={() => setSelectedSuggestion(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success"
                onClick={() => handleSubmit()}
                disabled={!selectedSuggestion}
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

export default Achievement;
