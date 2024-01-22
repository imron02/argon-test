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
router.get("/employees", [schemaCheckPagination, verifyToken], getEmployees);
router.get(
  "/employee/:id(\\d+)/",
  [schemaCheckId, verifyToken],
  findOrDeleteEmployeeById
);
router.post("/employees", [schemaCreate, verifyToken], postOrUpdateEmployees);
router.put("/employee/:id", [schemaUpdate, verifyToken], postOrUpdateEmployees);
router.delete(
  "/employee/:id",
  [schemaCheckId, verifyToken],
  findOrDeleteEmployeeById
);

module.exports = router;
