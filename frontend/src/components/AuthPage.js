import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../styles/AuthPage.css";

const AuthPage = ({ onLogin, setUserId }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (userData) => {
    setError("");
    const endpoint = isRegister ? "/auth/register" : "/auth/login";

    console.log("📤 Sending login request:", userData);

    try {
      const res = await fetch(`https://leetcode-project-backend.onrender.com${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log("📩 Server response:", data); // 🔍 בדיקה

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setUserId(data.userId);
      onLogin(data.role);

      if (data.role === "admin") navigate("/admin");
      else navigate("/user-dashboard"); // נוודא שהוא מופנה נכון
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? "Sign Up" : "Login"}</h2>
        {isRegister ? (
          <RegisterForm onSubmit={handleAuth} error={error} />
        ) : (
          <LoginForm onSubmit={handleAuth} error={error} />
        )}
        <p onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have an account? Login"
            : "Don’t have an account? Sign up"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
