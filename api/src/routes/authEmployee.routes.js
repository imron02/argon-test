const express = require("express");
const {
  loginEmployee,
  getEmployeeProfile,
} = require("../controllers/auth.controller");
const { schemaLogin, verifyToken } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/login", schemaLogin, loginEmployee);
router.get("/profile", verifyToken, getEmployeeProfile);

module.exports = router;
