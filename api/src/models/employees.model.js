const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Employees = sequelize.define(
  "employees",
  {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    photoPath: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.ENUM("contract", "permanent"),
      allowNull: false,
      defaultValue: "contract",
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = { Employees };
