const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User", // Default role is "User"
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default is not logged in
    },
  },
  {
    timestamps: true, // createdAt and updatedAt fields
  }
);

module.exports = User;
