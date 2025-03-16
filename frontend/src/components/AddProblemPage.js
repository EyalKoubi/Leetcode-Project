import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddProblemPage.css";

const AddProblemPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState(null);
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "video") setVideo(file);
    if (type === "code") setCode(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video || !code) {
      setMessage("❌ Video and code file are required!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("video", video);
    formData.append("code", code);

    try {
      const res = await fetch("http://localhost:3002/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed.");

      setMessage("✅ Upload successful!");
      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      setMessage(`❌ Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false); // ⏳ כיבוי טעינה אחרי ההעלאה
    }
  };

  return (
    <div className="add-problem-container">
      <h2>Add New Problem</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Problem Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Short Description (optional)"
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

        <label>📹 Upload Video:</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => handleFileChange(e, "video")}
          required
        />

        <label>🐍 Upload Python Code:</label>
        <input
          type="file"
          accept=".py"
          onChange={(e) => handleFileChange(e, "code")}
          required
        />

        <button type="submit" className="upload-btn">
          Upload
        </button>
        {isUploading && <p className="loading">Uploading... Please wait ⏳</p>}
      </form>

      {message && <p className="message">{message}</p>}

      <button className="back-btn" onClick={() => navigate("/admin")}>
        🔙 Back
      </button>
    </div>
  );
};

export default AddProblemPage;
