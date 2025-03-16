import React, { useState } from "react";

const LoginForm = ({ onSubmit, error, userId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password }); // עכשיו זה לא יתרסק כי הוא מקבל את הפונקציה
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginForm;
