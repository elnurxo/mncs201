const express = require("express");
const productController = require("../controllers/productController.js");
const verifyToken = require("../middleware/verifyToken.js");
const validateProduct = require("../middleware/productValidator.js");

const router = express.Router();

// GET all products
router.get("/", verifyToken, productController.getAllProducts);

// GET product by ID
router.get("/:id", verifyToken, productController.getProductById);

// POST a new product
router.post(
  "/",
  verifyToken,
  validateProduct, // Use the validation middleware
  productController.addProduct
);

// PUT update product by ID
router.put("/:id", verifyToken, productController.updateProduct);

// DELETE product by ID
router.delete("/:id", verifyToken, productController.deleteProduct);

module.exports = router;
