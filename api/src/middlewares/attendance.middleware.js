const { checkSchema } = require("express-validator");
const { Attendances } = require("../models/attendences.model");

const isValidDate = (value) => {
  return !isNaN(Date.parse(value));
};

const checkAttendance = async (value) => {
  const attendance = await Attendances.findByPk(value);
  if (!attendance) {
    throw new Error("Attendance not found");
  }
};

const schemaCheckIn = checkSchema({
  date: {
    custom: {
      options: isValidDate,
      errorMessage: "Format tanggal check in salah",
    },
    optional: true,
  },
});

const schemaCheckOut = checkSchema({
  id: {
    notEmpty: true,
    isNumeric: true,
    custom: {
      options: checkAttendance
    },
  },
  date: {
    custom: {
      options: isValidDate,
      errorMessage: "Format tanggal check out salah",
    },
    optional: true,
  },
});

module.exports = { schemaCheckIn, schemaCheckOut };
