const express = require("express");
const { body } = require("express-validator");
const productController = require("../controllers/productController.js");

const router = express.Router();

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.post(
  "/products",
  body("name")
    .isLength({ min: 3 })
    .withMessage("name length should be at least 3 characters"),
  body("price")
    .isFloat({ min: 1000 })
    .withMessage("price cannot be less than 1000"),
  productController.addProduct
);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
