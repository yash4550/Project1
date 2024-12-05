import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { login } from "../services/api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      localStorage.setItem("token", res.data.token); // Save the token to localStorage
      alert("Login successful");
      navigate("/ClientManager"); // Redirect to Dashboard
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      <button onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
      </form>
    </div>
  );
}

export default Login;
