import React, { useState } from "react";
import { requestPasswordReset } from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requestPasswordReset({ email });
      alert(res.data.message || "Check your email for password reset instructions.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to send password reset email.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Request Password Reset</button>
    </form>
  );
}

export default ForgotPassword;
