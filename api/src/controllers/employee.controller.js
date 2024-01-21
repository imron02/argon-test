const { validationResult } = require("express-validator");
const { Employees } = require("../models/employees.model");
const { paginate } = require("../utils/pagination.util");
const bcrypt = require("bcrypt");

const getEmployees = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 25;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).globalErrorResponse(errors.array());
  }

  try {
    const query = paginate(
      { order: [["updatedAt", "DESC"]] },
      { page, pageSize }
    );
    const { rows, count } = await Employees.findAndCountAll(query);
    const totalPages = Math.ceil(count / pageSize);

    res.globalResponse({ data: rows, count, totalPages });
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
      const dataUpdate = req.body;
      if (dataUpdate.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        dataUpdate.password = hashPassword;
      }

      await Employees.update(dataUpdate, {
        where: { id: req.params.id },
      });
      const employee = await Employees.findByPk(req.params.id);
      return res.globalResponse({ data: employee });
    }

    const dataCreate = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    dataCreate.password = hashPassword;

    const employee = await Employees.create(dataCreate);
    res.globalResponse({ data: employee });
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
      return res.globalResponse({ data: employee });
    }

    const employee = await Employees.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).globalErrorResponse("Data tidak ditemukan");
    }
    res.globalResponse({ data: employee });
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
