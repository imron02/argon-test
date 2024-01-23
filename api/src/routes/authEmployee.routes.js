const express = require("express");
const {
  loginEmployee,
  getEmployeeProfile,
} = require("../controllers/auth.controller");
const { schemaLogin, verifyToken } = require("../middlewares/auth.middleware");
const {
  getAttendance,
  postCheckIn,
  postCheckOut,
  getAttendances,
} = require("../controllers/attendence.controller");
const {
  schemaCheckIn,
  schemaCheckOut,
} = require("../middlewares/attendance.middleware");

const router = express.Router();
router.post("/login", schemaLogin, loginEmployee);
router.get("/profile", verifyToken, getEmployeeProfile);
router.get("/attendance", [verifyToken], getAttendance);
router.get("/attendances", [verifyToken], getAttendances);
router.get("/checkin", verifyToken, postCheckIn);
router.post("/checkout", [verifyToken, schemaCheckOut], postCheckOut);

module.exports = router;
