import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.js";

export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    skills,
    seniority,
    maxCapacity,
    department,
  } = req.body;

  try {
    // ✅ Check for missing required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Name, email, password, and role are required.",
      });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
      });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create and save new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      seniority,
      maxCapacity,
      department,
    });

    const savedUser = await newUser.save();

    // ✅ Return success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    // 🔴 Log full error stack for debugging
    console.error("Register Error:", error);

    // Check for Mongoose validation error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    // Catch-all server error
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile  = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

