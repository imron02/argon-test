"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      lastName: {
        type: Sequelize.STRING(50),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      "password": {
        allowNull: false,
        type: Sequelize.STRING
      },
      photoPath: {
        type: Sequelize.STRING(25),
      },
      position: {
        type: Sequelize.ENUM("contract", "permanent"),
        allowNull: false,
        defaultValue: "contract",
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employees");
  },
};
