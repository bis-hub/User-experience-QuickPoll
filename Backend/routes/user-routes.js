const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");

// User registration route
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, fullname, email } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      password: hashedPassword,
      fullname,
      email,
    });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET
      // { expiresIn: "1d" }
    );
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
});

// User login route
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET
      // { expiresIn: "1d" }
    );

    res.json({ status: "success", token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
