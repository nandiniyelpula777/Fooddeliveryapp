const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "Registration successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * LOGIN (FIXED PROPERLY)
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("hi")

    // 1. Validate input
    if (!email || !password) {
      console.log("Email and password are required")
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    console.log("response:", res)

    // 2. Check if user exists
    const user = await User.findOne({ email });
    console.log("Email and password are required")
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    // 4. Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
