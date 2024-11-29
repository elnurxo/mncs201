"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "category", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category cannot be empty",
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("Products", "category");
  },
};
