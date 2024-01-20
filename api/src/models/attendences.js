'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendences.init({
    employee_id: DataTypes.INTEGER,
    check_in_datetime: DataTypes.DATE,
    check_out_datetime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Attendences',
  });
  return Attendences;
};