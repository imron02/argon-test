const { validationResult } = require("express-validator");
const { Attendances } = require("../models/attendences.model");
const { Employees } = require("../models/employees.model");

const getAttendance = async (req, res) => {
  if (!req.user?.user) {
    return res.status(401).globalErrorResponse("Akses ditolak");
  }

  try {
    const usr = req.user.user;
    const attendances = await Attendances.findOne({
      where: { employeeId: usr.id },
    });

    if (!attendances) {
      return res.status(404).globalErrorResponse("Data tidak ditemukan");
    }

    res.globalResponse({ data: attendances });
  } catch (error) {
    console.error(error);
    res.status(500).globalErrorResponse("Terjadi kesalahan");
  }
};

const postCheckIn = async (req, res) => {
  if (!req.user?.user) {
    return res.status(401).globalErrorResponse("Akses ditolak");
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).globalErrorResponse(errors.array());
  }

  try {
    const usr = req.user.user;
    const employee = await Employees.findByPk(usr.id);
    if (!employee) {
      return res.status(404).globalErrorResponse("Data tidak ditemukan");
    }

    console.log("req", req.body);
    const attendance = await Attendances.create({
      checkInDatetime: req.body.date,
      employeeId: usr.id,
    });
    return res.globalResponse({ data: attendance });
  } catch (error) {
    console.error(error);
    res.status(500).globalErrorResponse("Terjadi kesalahan");
  }
};

const postCheckOut = async (req, res) => {
  if (!req.user?.user) {
    return res.status(401).globalErrorResponse("Akses ditolak");
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).globalErrorResponse(errors.array());
  }

  try {
    const usr = req.user.user;
    const employee = await Employees.findByPk(usr.id);
    if (!employee) {
      return res.status(404).globalErrorResponse("Data tidak ditemukan");
    }

    const attendance = await Attendances.update(
      { checkOutDatetime: req.body.date },
      { where: { id: req.body.id } }
    );
    return res.globalResponse({ data: attendance });
  } catch (error) {
    console.error(error);
    res.status(500).globalErrorResponse("Terjadi kesalahan");
  }
};

module.exports = { getAttendance, postCheckIn, postCheckOut };
