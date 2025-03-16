import React, { useState } from "react";
import EditProblemModal from "./EditProblemModal";
import "../styles/ProblemItem.css";

const ProblemItem = ({ problem, onDelete, onEdit, isUserView }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="problem-item">
      <h3>{problem.name}</h3>
      <p>{problem.description}</p>
      <p>
        <strong>Category:</strong> {problem.category}
      </p>
      <a href={problem.videoUrl} target="_blank" rel="noopener noreferrer">
        📹 Watch Video
      </a>
      <a href={problem.codeUrl} target="_blank" rel="noopener noreferrer">
        🐍 View Code
      </a>
      <div>
        {!isUserView && (
          <div className="button-group">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              ✏ Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(problem._id)}
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <EditProblemModal
          problem={problem}
          onClose={() => setIsEditing(false)}
          onSave={onEdit}
        />
      )}
    </div>
  );
};

export default ProblemItem;
