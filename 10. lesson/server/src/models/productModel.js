const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database.js");

const Product = sequelize.define(
  "Product", // Table name is automatically pluralized to "Products"
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Product name cannot be empty",
        },
        len: {
          args: [3, 255],
          msg: "Product name must be between 3 and 255 characters",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: "Price must be a valid number",
        },
        min: {
          args: [0],
          msg: "Price must be a positive number",
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category cannot be empty",
        },
      },
    },
  },
  {
    timestamps: true, // Disable the automatic createdAt and updatedAt fields
  }
);

module.exports = Product;
