import React from "react";
import "../styles/ProblemItem.css";

const ProblemItemUser = ({ problem, onDelete }) => {
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
    </div>
  );
};

export default ProblemItemUser;
