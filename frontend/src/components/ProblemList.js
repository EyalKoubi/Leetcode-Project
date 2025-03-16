import React from "react";
import ProblemItem from "./ProblemItem";
import "../styles/ProblemList.css";

const ProblemList = ({ problems, onDelete, onEdit, isUserView = false }) => {
  return (
    <div className="problem-list">
      <h2>Existing Problems</h2>
      {problems.length === 0 ? (
        <p>No problems added yet.</p>
      ) : (
        problems.map((problem) => (
          <ProblemItem
            key={problem._id}
            problem={problem}
            onDelete={isUserView ? null : onDelete}
            onEdit={isUserView ? null : onEdit}
          />
        ))
      )}
    </div>
  );
};

export default ProblemList;
