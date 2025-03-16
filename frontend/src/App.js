import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./components/AuthPage";
import AdminDashboard from "./components/AdminDashboard";
import AddProblemPage from "./components/AddProblemPage";
import UserDashboard from "./components/UserDashboard"; // 🆕 נוסיף את דף המשתמש

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AuthPage onLogin={setRole} setUserId={setUserId} />}
        />
        {role === "admin" ? (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/add-problem" element={<AddProblemPage />} />
          </>
        ) : role === "user" ? (
          <Route
            path="/user-dashboard"
            element={<UserDashboard userId={userId} />}
          /> // 🆕 מסך משתמש
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
