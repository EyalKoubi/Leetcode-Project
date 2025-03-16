import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemList from "./ProblemList";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleEdit = (updatedProblem) => {
    setProblems((prevProblems) =>
      prevProblems.map((p) =>
        p._id === updatedProblem._id ? updatedProblem : p
      )
    );
  };

  const fetchProblems = async () => {
    try {
      const res = await fetch("http://localhost:3002/admin/problems");
      const data = await res.json();
      setProblems(data);
    } catch (error) {
      console.error("❌ Error fetching problems:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3002/admin/problems/${id}`, {
        method: "DELETE",
      });
      setProblems(problems.filter((problem) => problem._id !== id));
    } catch (error) {
      console.error("❌ Error deleting problem:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // 🔹 חישוב מספר הדפים
  const totalPages = Math.ceil(problems.length / problemsPerPage);

  // 🔹 חישוב אילו בעיות להציג בעמוד הנוכחי
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );

  // 🔹 מעבר לדף הבא
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // 🔹 חזרה לדף הקודם
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="admin-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard 🎥🐍</h1>
        <button className="add-btn" onClick={() => navigate("/add-problem")}>
          ➕ Add Problem
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <ProblemList
        problems={currentProblems}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* 🔹 ניווט בין דפים */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
