const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Attendances = sequelize.define("attendences", {
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: "employees",
      key: "id",
    },
    allowNull: false,
  },
  checkInDatetime: {
    type: DataTypes.DATE,
  },
  checkOutDatetime: {
    type: DataTypes.DATE,
  },
});

module.exports = { Attendances };
