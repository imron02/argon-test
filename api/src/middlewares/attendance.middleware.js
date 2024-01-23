const { checkSchema } = require("express-validator");
const { Attendances } = require("../models/attendences.model");

const checkAttendance = async (value) => {
  const attendance = await Attendances.findByPk(value);
  if (!attendance) {
    throw new Error("Attendance not found");
  }
};

const schemaCheckOut = checkSchema({
  id: {
    notEmpty: true,
    isNumeric: true,
    custom: {
      options: checkAttendance,
    },
  },
});

module.exports = { schemaCheckOut };
