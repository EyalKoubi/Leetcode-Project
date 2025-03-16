import React from "react";
import ProblemItemUser from "./ProblemItemUser";
import "../styles/ProblemList.css";

const ProblemListUser = ({ problems }) => {
  return (
    <div className="problem-list">
      <h2>Existing Problems</h2>
      {problems.length === 0 ? (
        <p>No problems added yet.</p>
      ) : (
        problems.map((problem) => (
          <ProblemItemUser key={problem._id} problem={problem} />
        ))
      )}
    </div>
  );
};

export default ProblemListUser;
