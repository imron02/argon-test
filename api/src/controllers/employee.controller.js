const { validationResult } = require("express-validator");
const { Employees } = require("../models/employees.model");
const getEmployees = async (_, res) => {
  try {
    const employees = await Employees.findAll();
    res.globalResponse(employees);
  } catch (error) {
    console.error(error);
    res.status(500).globalErrorResponse("Terjadi kesalahan");
  }
};

const postOrUpdateEmployees = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).globalErrorResponse(errors.array());
    }

    if (req.method === "PUT") {
      await Employees.update(req.body, {
        where: { id: req.params.id },
      });
      const employee = await Employees.findByPk(req.params.id);
      return res.globalResponse(employee);
    }

    const employee = await Employees.create(req.body);
    res.globalResponse(employee);
  } catch (error) {
    console.error(error);
    res.status(500).globalErrorResponse("Terjadi kesalahan");
  }
};

const findOrDeleteEmployeeById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).globalErrorResponse(errors.array());
    }

    if (req.method === "DELETE") {
      const employee = await Employees.destroy({
        where: { id: req.params.id },
      });
      if (employee === 0) {
        return res.status(404).globalErrorResponse("Data tidak ditemukan");
      }
      return res.globalResponse(employee);
    }

    const employee = await Employees.findByPk(req.params.id);
    res.globalResponse(employee);
  } catch (error) {
    console.error(error);
    res.status(500).globalErrorResponse("Terjadi kesalahan");
  }
};

module.exports = {
  getEmployees,
  postOrUpdateEmployees,
  findOrDeleteEmployeeById,
};
