const { body } = require("express-validator");

// Product validation middleware
const validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3 })
    .withMessage("Product name should be at least 3 characters long"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category").notEmpty().withMessage("Category is required"),
];

module.exports = validateProduct;