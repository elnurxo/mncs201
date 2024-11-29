const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const Product = require("../models/productModel.js");

// Utility functions for sending success and error responses
const sendSuccessResponse = (res, message, data) => {
  res.status(200).json({ message, data });
};

const sendErrorResponse = (res, message, error) => {
  res.status(500).json({ message, error: error.message });
};

const getAllProducts = async (req, res) => {
  const { name } = req.query;
  try {
    const products = name
      ? await Product.findAll({ where: { name: { [Op.like]: `%${name}%` } } })
      : await Product.findAll();
    sendSuccessResponse(res, "Products fetched successfully", products);
  } catch (error) {
    sendErrorResponse(res, "Error fetching products", error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      sendSuccessResponse(res, "Product found", product);
    } else {
      res.status(404).json({ message: "Product not found", data: {} });
    }
  } catch (error) {
    sendErrorResponse(res, "Error fetching product", error);
  }
};

const addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newProduct = req.body;
  try {
    const addedProduct = await Product.create(newProduct);
    sendSuccessResponse(res, "Product added successfully", addedProduct);
  } catch (error) {
    sendErrorResponse(res, "Error adding product", error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  try {
    const [updatedRowCount, updatedRows] = await Product.update(
      updatedProduct,
      {
        where: { id },
        returning: true,
      }
    );
    if (updatedRowCount > 0) {
      sendSuccessResponse(res, "Product updated successfully", updatedRows[0]);
    } else {
      res.status(404).json({ message: "Product not found", data: {} });
    }
  } catch (error) {
    sendErrorResponse(res, "Error updating product", error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.destroy({ where: { id } });
    if (deletedProduct) {
      res.json({ message: "Product deleted successfully", data: {} });
    } else {
      res.status(404).json({ message: "Product not found", data: {} });
    }
  } catch (error) {
    sendErrorResponse(res, "Error deleting product", error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
