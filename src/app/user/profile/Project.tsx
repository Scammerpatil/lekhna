import { useUser } from "@/context/UserContext";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Projects = () => {
  const { user } = useUser();
  if (!user) return null;

  const [formData, setFormData] = useState(user);
  const [projectInput, setProjectInput] = useState({
    title: "",
    description: "",
    technologies: [],
    links: {
      github: "",
      liveDemo: "",
    },
  });
  const [techInput, setTechInput] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = async () => {
    const updatedProjects = [...(user.projects || [])];
    if (editIndex !== null) {
      updatedProjects[editIndex] = projectInput;
    } else {
      updatedProjects.push(projectInput);
    }

    const updatedForm = {
      ...formData,
      projects: updatedProjects,
    };

    setFormData(updatedForm);
    setProjectInput({
      title: "",
      description: "",
      technologies: [],
      links: {
        github: "",
        liveDemo: "",
      },
    });
    setTechInput("");
    setEditIndex(null);
    setAiSuggestions([]);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Updating User...",
      success: "Project Updated",
      error: "Update Failed",
    });
  };

  const handleDelete = async (index: number) => {
    const updatedProjects = [...(user.projects || [])];
    updatedProjects.splice(index, 1);

    const updatedForm = {
      ...formData,
      projects: updatedProjects,
    };

    setFormData(updatedForm);

    const response = axios.patch("/api/user/update", { formData: updatedForm });
    toast.promise(response, {
      loading: "Deleting...",
      success: "Deleted Successfully",
      error: "Delete Failed",
    });
  };

  const handleGenerateWithAI = async () => {
    if (
      !projectInput.title ||
      !projectInput.technologies.length ||
      !projectInput.description
    ) {
      toast.error("Please provide a title and at least one technology.");
      return;
    }
    const response = axios.post("/api/generate-text/project", {
      title: projectInput.title,
      technologies: projectInput.technologies,
      projectDescription: projectInput.description,
    });

    toast.promise(response, {
      loading: "Generating...",
      success: (data) => {
        const suggestions = data.data.descriptions;
        setAiSuggestions(suggestions);
        return "Generated";
      },
      error: "Generation Failed",
    });
  };

  const handleEdit = (index: number) => {
    setProjectInput(user.projects![index]);
    setEditIndex(index);
    (document.getElementById("addProject") as HTMLDialogElement).showModal();
  };

  const addTechnology = () => {
    if (techInput && !projectInput.technologies.includes(techInput)) {
      setProjectInput({
        ...projectInput,
        technologies: [...projectInput.technologies, techInput],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setProjectInput({
      ...projectInput,
      technologies: projectInput.technologies.filter((t) => t !== tech),
    });
  };

  return (
    <div className="w-full">
      <h1 className="uppercase text-3xl text-center">Projects</h1>

      {user?.projects?.length! > 0 ? (
        <ul className="overflow-x-auto w-full">
          {user.projects.map((proj, index) => (
            <li
              key={index}
              className="text-base mt-6 border border-base-content p-6 rounded-lg flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-bold text-lg">{proj.title}</p>
                <p>{proj.description}</p>
                <p className="text-sm text-base-content mt-2">
                  Tech: {proj.technologies.join(", ")}
                </p>
                <div className="mt-2 text-sm text-primary space-x-2">
                  {proj?.links?.github && (
                    <a href={proj.links.github} target="_blank">
                      GitHub
                    </a>
                  )}
                  {proj.links?.liveDemo && (
                    <a href={proj.links.liveDemo} target="_blank">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
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
                  <IconTrash size={20} className="text-error" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-xl text-center mt-6">No Projects Found</div>
      )}

      <button
        className="btn btn-secondary w-full mt-6"
        onClick={() => {
          setProjectInput({
            title: "",
            description: "",
            technologies: [],
            links: { github: "", liveDemo: "" },
          });
          setTechInput("");
          setEditIndex(null);
          setAiSuggestions([]);
          (
            document.getElementById("addProject") as HTMLDialogElement
          ).showModal();
        }}
      >
        <IconPlus size={24} /> Add New Project
      </button>

      {/* Modal */}
      <dialog id="addProject" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">
            {editIndex !== null ? "Edit" : "Add"} Project
          </h3>

          <input
            type="text"
            placeholder="Project Title"
            className="input input-bordered w-full mt-4"
            value={projectInput.title}
            onChange={(e) =>
              setProjectInput({ ...projectInput, title: e.target.value })
            }
          />

          <textarea
            placeholder="Raw Project Description"
            className="textarea textarea-bordered w-full mt-4"
            rows={4}
            value={projectInput.description}
            onChange={(e) =>
              setProjectInput({ ...projectInput, description: e.target.value })
            }
          />

          <div className="mt-4">
            <label className="block mb-1 font-medium">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="input input-bordered w-full"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
              />
              <button className="btn btn-outline" onClick={addTechnology}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectInput.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="badge badge-secondary cursor-pointer"
                  onClick={() => removeTechnology(tech)}
                >
                  {tech} ✕
                </span>
              ))}
            </div>
          </div>

          <input
            type="url"
            placeholder="GitHub Link"
            className="input input-bordered w-full mt-4"
            value={projectInput.links.github}
            onChange={(e) =>
              setProjectInput({
                ...projectInput,
                links: { ...projectInput.links, github: e.target.value },
              })
            }
          />
          <input
            type="url"
            placeholder="Live Demo Link"
            className="input input-bordered w-full mt-4"
            value={projectInput.links.liveDemo}
            onChange={(e) =>
              setProjectInput({
                ...projectInput,
                links: { ...projectInput.links, liveDemo: e.target.value },
              })
            }
          />

          <button
            className="btn btn-primary mt-4"
            onClick={handleGenerateWithAI}
          >
            Generate Description with AI
          </button>

          {aiSuggestions.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold mb-2">AI Suggestions:</p>
              <ul className="space-y-2">
                {aiSuggestions.map((desc, idx) => (
                  <li
                    key={idx}
                    className={`p-3 border rounded cursor-pointer hover:bg-base-200 ${
                      projectInput.description === desc
                        ? "bg-primary text-primary-content"
                        : ""
                    }`}
                    onClick={() =>
                      setProjectInput({ ...projectInput, description: desc })
                    }
                  >
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={!projectInput.title || !projectInput.description}
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

export default Projects;
