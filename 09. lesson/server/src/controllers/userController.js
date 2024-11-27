const { validationResult } = require("express-validator");
const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const secret_key = process.env.TOKEN_SECRET_KEY;

// Business Logic
const getAllUsers = (req, res) => {
  const { username } = req.query;
  const users = userModel.getAllUsers();
  const filteredUsers = username
    ? users.filter((user) =>
        user.username.toLowerCase().includes(username.toLowerCase())
      )
    : users;
  res.json({ message: "Successful", data: filteredUsers });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = userModel.getUserById(parseInt(id));
  if (user) {
    res.json({ message: "Success", data: user });
  } else {
    res.status(404).json({ message: "User not found", data: {} });
  }
};

//bcrypt for hashing password
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  // Check for unique email and username
  const users = userModel.getAllUsers();
  const existingUserByEmail = users.find((user) => user.email === email);
  const existingUserByUsername = users.find(
    (user) => user.username === username
  );

  if (existingUserByEmail) {
    return res.status(400).json({ message: "Email is already taken" });
  }

  if (existingUserByUsername) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { ...req.body, password: hashedPassword };

    // Register the new user
    const addedUser = userModel.register(newUser);

    res.status(201).json({
      message: "User registered successfully",
      data: addedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;
  const updatedUser = userModel.updateUser(parseInt(id), updatedUserData);
  if (updatedUser) {
    res.json({ message: "User updated successfully", data: updatedUser });
  } else {
    res.status(404).json({ message: "User not found", data: {} });
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const deletedUser = userModel.deleteUser(parseInt(id));
  if (deletedUser) {
    res.json({ message: "User deleted successfully", data: deletedUser });
  } else {
    res.status(404).json({ message: "User not found", data: {} });
  }
};

//jwt token generate
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const result = userModel.login(username, password);
  if (result.user) {
    const { id, role, password: storedHashedPassword } = result.user;
    // Generate JWT token
    try {
      const isPasswordValid = await bcrypt.compare(
        password,
        storedHashedPassword
      );
      if (isPasswordValid) {
        // Generate JWT token if the password matches
        const token = jwt.sign(
          { id: id, role: role },
          secret_key,
          { expiresIn: "1h" } // Set token expiration to 1 hour
        );
        return res.json({
          message: result.message,
          data: result.user,
          token: token,
        });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server error during password comparison" });
    }
  } else {
    res.status(401).json({ message: result.message });
  }
};

const logoutUser = (req, res) => {
  const { id } = req.params;
  const result = userModel.logout(parseInt(id));
  if (result.message === "Logout successful") {
    res.json({ message: result.message });
  } else {
    res.status(404).json({ message: result.message });
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
