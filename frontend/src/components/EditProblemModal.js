import React, { useState } from "react";
import "../styles/EditProblemModal.css";

const EditProblemModal = ({ problem, onClose, onSave, setProblems }) => {
  const [name, setName] = useState(problem.name);
  const [description, setDescription] = useState(problem.description);
  const [category, setCategory] = useState(problem.category);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3002/admin/problems/${problem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            category,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed.");

      setProblems((prevProblems) =>
        prevProblems.map((p) => (p._id === data.problem._id ? data.problem : p))
      );
      onSave(data.problem);
      setTimeout(() => onClose(), 50);
    } catch (err) {
      console.error("❌ Error updating problem:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Problem</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Problem Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProblemModal;
