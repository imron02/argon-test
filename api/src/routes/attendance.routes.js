const express = require("express");
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getAttendance,
  postCheckIn,
  postCheckOut,
} = require("../controllers/attendence.controller");
const {
  schemaCheckIn,
  schemaCheckOut,
} = require("../middlewares/attendance.middleware");

const router = express.Router();
router.get("/attendance", [verifyToken], getAttendance);
router.post("/checkin", [verifyToken, schemaCheckIn], postCheckIn);
router.post("/checkout", [verifyToken, schemaCheckOut], postCheckOut);

module.exports = router;
