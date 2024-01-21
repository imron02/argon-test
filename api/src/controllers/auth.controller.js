require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { Employees } = require("../models/employees.model");
const { generateToken } = require("../utils/auth.util");

const loginEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).globalErrorResponse(errors.array());
  }

  try {
    const { email, password } = req.body;
    const employee = await Employees.findOne({ where: { email } });
    if (!employee) {
      return res.status(404).globalErrorResponse("User tidak ditemukan");
    }

    const isPasswordMatch = await bcrypt.compare(password, employee.password);
    if (!isPasswordMatch) {
      return res.status(401).globalErrorResponse("Email atau password salah");
    }

    const token = generateToken(employee);

    return res.globalResponse({ data: token });
  } catch (error) {
    console.error(error);
    res.status(500).globalErrorResponse("Terjadi kesalahan");
  }
};

const getEmployeeProfile = async (req, res) => {
  if (!req.user?.user) {
    return res.status(401).globalErrorResponse("Akses ditolak");
  }

  try {
    const user = req.user.user;
    const employee = await Employees.findByPk(user.id);
    if (!employee) {
      return res.status(404).globalErrorResponse("User tidak ditemukan");
    }
    res.globalResponse({ data: employee });
  } catch (error) {
    console.error(error);
    res.status(500).globalErrorResponse("Terjadi kesalahan");
  }
};

module.exports = { loginEmployee, getEmployeeProfile };
