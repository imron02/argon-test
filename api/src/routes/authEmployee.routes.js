const express = require("express");
const {
  loginEmployee,
  getEmployeeProfile,
} = require("../controllers/auth.controller");
const {
  schemaEmployeeLogin,
  verifyToken,
} = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/login", schemaEmployeeLogin, loginEmployee);
router.get("/profile", verifyToken, getEmployeeProfile);

module.exports = router;
