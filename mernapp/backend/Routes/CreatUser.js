const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = "MynameisEndtoEndYouTubeChanneli$#";
const { body, validationResult } = require("express-validator");

router.post(
  "/creatuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create new user
      user = await User.create({
        name: req.body.name,
        password: hashedPassword, // Save hashed password
        email: req.body.email,
        location: req.body.location,
      });

      // Generate JWT token
      const data = {
        user: {
          id: user.id
        }
      };
      const authToken = jwt.sign(data, jwtSecret);
      
      res.json({ success: true, authToken: authToken, message: "User created successfully" });

    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

module.exports = router;
