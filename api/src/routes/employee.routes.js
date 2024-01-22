const express = require("express");
const {
  getEmployees,
  postOrUpdateEmployees,
  findOrDeleteEmployeeById,
} = require("../controllers/employee.controller");
const {
  schemaCheckPagination,
  schemaCheckId,
  schemaCreate,
  schemaUpdate,
} = require("../middlewares/employee.middleware");
const { verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();
router.get("/employees", schemaCheckPagination, getEmployees);
router.get("/employee/:id(\\d+)/", schemaCheckId, findOrDeleteEmployeeById);
router.post("/employees", schemaCreate, postOrUpdateEmployees);
router.put("/employee/:id", [schemaUpdate, verifyToken], postOrUpdateEmployees);
router.delete("/employee/:id", schemaCheckId, findOrDeleteEmployeeById);

module.exports = router;
