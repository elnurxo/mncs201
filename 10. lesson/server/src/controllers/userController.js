const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { sequelize } = require("../config/database");
const { Op } = require("sequelize");

dotenv.config();
const secret_key = process.env.TOKEN_SECRET_KEY;

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { username } = req.query;

    // Query users from the database
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude sensitive data
    });

    // Filter users if username query param exists
    const filteredUsers = username
      ? users.filter((user) =>
          user.username.toLowerCase().includes(username.toLowerCase())
        )
      : users;

    res.json({ message: "Successful", data: filteredUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID in the database
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude sensitive data
    });

    if (user) {
      res.json({ message: "Success", data: user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Username is already taken" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      role: "User", // Default role
      isLoggedIn: false,
    });

    res.status(201).json({
      message: "User registered successfully",
      data: { ...newUser.toJSON(), password: undefined },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    const updatedUser = await user.update(updatedUserData);
    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user from the database
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, secret_key, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      data: { ...user.toJSON(), password: undefined },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Logout a user
const logoutUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user || !user.isLoggedIn) {
      return res
        .status(404)
        .json({ message: "User not logged in or not found" });
    }

    // Update isLoggedIn status
    await user.update({ isLoggedIn: false });
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging out" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};