const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require("crypto");

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    if (!email || !newPassword) {
      return res.status(400).json({ error: "Email and new password are required." });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Email not registered in our system." });
      }
  
      if (!user.resetToken || user.resetTokenExpiry < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired reset token." });
      }
  
      // Hash the new password and update the user
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();
  
      res.status(200).json({ message: "Password reset successful. You can now log in with your new password." });
    } catch (error) {
      console.error("Reset Password Error:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };

  exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Email not registered in our system." });
      }
  
      // Generate a token for password reset
      const token = crypto.randomBytes(32).toString("hex");
      user.resetToken = token;
      user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
      await user.save();
  
      // TODO: Integrate an email service to send the reset link to the user's email
      console.log(`Password reset token for ${email}: ${token}`);
      
      res.status(200).json({ message: "If your email is registered, you will receive a password reset link." });
    } catch (error) {
      console.error("Request Password Reset Error:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  };