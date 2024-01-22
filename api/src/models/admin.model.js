const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Admin = sequelize.define("admins", {
  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: DataTypes.STRING,
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = { Admin };
