const express = require("express");
const { body } = require("express-validator");
const productController = require("../controllers/productController.js");
const verifyToken = require("../middleware/verifyToken.js");

//create Express Router
const router = express.Router();

router.get("/products", verifyToken, productController.getAllProducts);
router.get("/products/:id", verifyToken, productController.getProductById);
router.post(
  "/products",
  verifyToken,
  body("name")
    .isLength({ min: 3 })
    .withMessage("name length should be at least 3 characters"),
  body("price")
    .isFloat({ min: 1000 })
    .withMessage("price cannot be less than 1000"),
  productController.addProduct
);
router.put("/products/:id", verifyToken, productController.updateProduct);
router.delete("/products/:id", verifyToken, productController.deleteProduct);

module.exports = router;
