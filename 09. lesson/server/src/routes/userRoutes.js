const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController.js");
const verifyToken = require("../middleware/verifyToken.js");
// Create Express Router
const router = express.Router();

// Routes - middleware
router.get("/users", verifyToken, userController.getAllUsers);
router.get("/users/:id", verifyToken, userController.getUserById);

//register
router.post(
  "/users",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
  ],
  userController.registerUser
);

router.put(
  "/users/:id",
  verifyToken,
  [
    body("username")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
  ],
  userController.updateUser
);
router.delete("/users/:id", verifyToken, userController.deleteUser);
router.post(
  "/users/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  userController.loginUser
);
router.post("/users/logout/:id", verifyToken, userController.logoutUser);

module.exports = router;
