const { body } = require("express-validator");

// User validation middleware
const validateUser = [
  // Validate username
  body("username")
    .optional() // Allow this field to be optional (e.g., during updates)
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  // Validate email
  body("email")
    .optional() // Allow this field to be optional
    .isEmail()
    .withMessage("Invalid email address"),

  // Validate password
  body("password")
    .optional() // Allow this field to be optional
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Validate role (if applicable)
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be 'user' or 'admin'"),
];

module.exports = validateUser;