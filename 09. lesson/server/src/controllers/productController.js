const { validationResult } = require("express-validator");
const productModel = require("../models/productModel.js");

//business logic
const getAllProducts = (req, res) => {
  const { name } = req.query;
  const products = productModel.getAllProducts();
  const filteredProducts = name
    ? products.filter((prod) =>
        prod.name.toLowerCase().includes(name.toLowerCase())
      )
    : products;
  res.json({ message: "successful", data: filteredProducts });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const product = productModel.getProductById(parseInt(id));
  if (product) {
    res.json({ message: "success", data: product });
  } else {
    res.json({ message: "data not found", data: {} });
  }
};

const addProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newProduct = req.body;
  const addedProduct = productModel.addProduct(newProduct);
  res.json({ message: "data posted successfully", data: addedProduct });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  const updatedProd = productModel.updateProduct(parseInt(id), updatedProduct);
  if (updatedProd) {
    res.json({ message: "data updated successfully", data: updatedProd });
  } else {
    res.json({ message: "data not found", data: {} });
  }
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const deletedProduct = productModel.deleteProduct(parseInt(id));
  if (deletedProduct) {
    res.json({ message: "data deleted successfully", data: deletedProduct });
  } else {
    res.json({ message: "data not found", data: {} });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
