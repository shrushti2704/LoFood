const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const jwtSecret = "MynameisEndtoEndYouTubeChanneli$#";

// POST /api/loginuser
router.post('/loginuser', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request Email:", email);
    console.log("Request Password:", password);

    // Find user by email
    const user = await User.findOne({ email: email });
    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password in DB:", user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, jwtSecret);

    return res.status(200).json({ success: true, authToken: authToken, message: "Login successful" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
