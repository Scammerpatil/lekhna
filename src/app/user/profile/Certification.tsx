import { useUser } from "@/context/UserContext";
import { IconPlus, IconTrash, IconPencil } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Certification = () => {
  const { user } = useUser();
  if (!user) return null;

  const [formData, setFormData] = useState(user);
  const [certificate, setCertificate] = useState({
    name: "",
    issuedBy: "",
    date: new Date(),
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSaveCertificate = async () => {
    if (!certificate.name || !certificate.issuedBy || !certificate.date) {
      alert("Please fill in all certificate fields");
      return;
    }

    let updatedCerts = [...(formData.certifications || [])];

    if (editIndex !== null) {
      updatedCerts[editIndex] = certificate;
    } else {
      updatedCerts.push(certificate);
    }

    const updatedData = { ...formData, certifications: updatedCerts };
    setFormData(updatedData);

    const response = axios.patch("/api/user/update", { formData: updatedData });

    toast.promise(response, {
      loading: "Updating User...",
      success: "User Updated Successfully",
      error: "Something went wrong",
    });

    // Reset
    setCertificate({ name: "", issuedBy: "", date: new Date() });
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    const cert = formData.certifications?.[index];
    if (!cert) return;

    setCertificate({
      name: cert.name,
      issuedBy: cert.issuedBy,
      date: new Date(cert.date),
    });
    setEditIndex(index);
    (
      document.getElementById("addCertificate") as HTMLDialogElement
    ).showModal();
  };

  const handleDelete = async (index: number) => {
    const updatedCerts =
      formData.certifications?.filter((_, i) => i !== index) || [];
    const updatedData = { ...formData, certifications: updatedCerts };
    setFormData(updatedData);

    const response = axios.patch("/api/user/update", { formData: updatedData });
    toast.promise(response, {
      loading: "Deleting...",
      success: "Deleted Successfully",
      error: "Delete Failed",
    });
  };

  return (
    <div className="w-full">
      <h1 className="uppercase text-3xl text-center">Certification</h1>

      {formData?.certifications?.length! > 0 ? (
        <ul className="overflow-x-auto w-full">
          {formData?.certifications?.map((certificate, index) => (
            <li
              key={index}
              className="text-base mt-6 border border-base-content p-4 rounded-lg flex justify-between items-center"
            >
              <span>
                {certificate.name} - {certificate.issuedBy} -{" "}
                {new Date(certificate.date).toLocaleDateString("en-US")}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="btn btn-sm btn-info"
                >
                  <IconPencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-sm btn-error"
                >
                  <IconTrash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-xl text-center mt-6">No Certification Found</div>
      )}

      <button
        className="btn btn-secondary w-full mt-6"
        onClick={() => {
          setCertificate({ name: "", issuedBy: "", date: new Date() });
          setEditIndex(null);
          (
            document.getElementById("addCertificate") as HTMLDialogElement
          ).showModal();
        }}
      >
        <IconPlus size={24} /> Add New Certificate
      </button>

      <dialog id="addCertificate" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg">
            {editIndex !== null ? "Edit" : "Add"} Certificate
          </h3>

          <input
            type="text"
            placeholder="Certificate Name"
            className="input input-bordered w-full mt-4"
            value={certificate.name}
            onChange={(e) =>
              setCertificate({ ...certificate, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Issued By"
            className="input input-bordered w-full mt-4"
            value={certificate.issuedBy}
            onChange={(e) =>
              setCertificate({ ...certificate, issuedBy: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered w-full mt-4"
            value={certificate.date.toISOString().split("T")[0]}
            onChange={(e) =>
              setCertificate({ ...certificate, date: new Date(e.target.value) })
            }
          />

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success"
                onClick={handleSaveCertificate}
                disabled={
                  !certificate.name ||
                  !certificate.issuedBy ||
                  !certificate.date
                }
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

export default Certification;
