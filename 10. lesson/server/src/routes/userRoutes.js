const express = require("express");
const userController = require("../controllers/userController.js");
const verifyToken = require("../middleware/verifyToken.js");
const validateUser = require("../middleware/userValidator.js");

// Create Express Router
const router = express.Router();

// Routes

// Get all users (protected route)
router.get("/", verifyToken, userController.getAllUsers);

// Get a user by ID (protected route)
router.get("/:id", verifyToken, userController.getUserById);

// Register a new user
router.post("/", validateUser, userController.registerUser);

// Update a user's details (protected route)
router.put("/:id", verifyToken, validateUser, userController.updateUser);

// Delete a user (protected route)
router.delete("/:id", verifyToken, userController.deleteUser);

// User login
router.post("/login", validateUser, userController.loginUser);

// User logout (protected route)
router.post("/logout/:id", verifyToken, userController.logoutUser);

module.exports = router;
