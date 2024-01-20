const express = require("express");
const {
  getEmployees,
  postOrUpdateEmployees,
  findOrDeleteEmployeeById,
} = require("../controllers/employee.controller");
const { checkSchema, validationResult } = require("express-validator");
const { Employees } = require("../models/employees.model");

const schemaCheckId = checkSchema({
  id: { notEmpty: true, isInt: true, in: ["params"] },
});

const schemaCreate = checkSchema({
  firstName: {
    notEmpty: true,
  },
  email: {
    notEmpty: true,
    isEmail: true,
    custom: {
      options: async (value) => {
        const employee = await Employees.findOne({
          where: { email: value },
          paranoid: false,
        });
        if (employee) {
          throw new Error("Email already registered");
        }
      },
      bail: true,
    },
  },
  position: {
    isIn: {
      options: [["contract", "permanent"]],
      errorMessage: "Position type must be either 'contract' or 'permanent'",
    },
    optional: true,
  },
  phoneNumber: {
    notEmpty: true,
    isMobilePhone: true,
    custom: {
      options: async (value) => {
        const employee = await Employees.findOne({
          where: { phoneNumber: value },
          paranoid: false,
        });
        if (employee) {
          throw new Error("Phone number already registered");
        }
      },
      bail: true,
    },
  },
});

const schemaUpdate = checkSchema({
  id: {
    notEmpty: true,
    isInt: true,
    in: ["params"],
    custom: {
      options: async (value) => {
        const employee = await Employees.findByPk(value);
        if (!employee) {
          throw new Error("Employee not found");
        }
      },
    },
  },
  email: {
    optional: { checkFalsy: true },
    isEmail: true,
    custom: {
      options: async (value, { req }) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          const exist = !!errors?.errors?.find((e) => e.path === "id");
          if (exist) return;
        }
        const employee = await Employees.findOne({
          where: { email: value },
          paranoid: false,
        });
        if (employee && employee.id != req.params.id) {
          throw new Error("Email already registered");
        }
      },
      bail: true,
    },
  },
  position: {
    isIn: {
      options: [["contract", "permanent"]],
      errorMessage: "Position type must be either 'contract' or 'permanent'",
    },
    optional: true,
  },
  phoneNumber: {
    optional: true,
    isMobilePhone: true,
    custom: {
      options: async (value, { req }) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          const exist = !!errors?.errors?.find((e) => e.path === "id");
          if (exist) return;
        }
        const employee = await Employees.findOne({
          where: { phoneNumber: value },
          paranoid: false,
        });
        if (employee && employee.id != req.params.id) {
          throw new Error("Phone number already registered");
        }
      },
      bail: true,
    },
  },
});

const router = express.Router();
router.get("/employees", getEmployees);
router.get("/employee/:id", schemaCheckId, findOrDeleteEmployeeById);
router.post("/employees", schemaCreate, postOrUpdateEmployees);
router.put("/employee/:id", schemaUpdate, postOrUpdateEmployees);
router.delete("/employee/:id", schemaCheckId, findOrDeleteEmployeeById);

module.exports = router;
