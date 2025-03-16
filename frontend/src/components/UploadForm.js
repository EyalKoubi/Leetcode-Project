import React, { useState } from "react";
import "../styles/UploadForm.css";

const UploadForm = ({ onUpload }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState(null);
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState("");

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
      setMessage(data.message || "✅ Upload successful!");
      onUpload();
    } catch (err) {
      setMessage("❌ Upload failed. Please try again.");
    }
  };

  return (
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

      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default UploadForm;
