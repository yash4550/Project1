import React, { useState } from "react";
import { resetPassword } from "../services/api";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await resetPassword(formData);
      alert(res.data.message || "Password reset successful!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to reset password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ResetPassword;
