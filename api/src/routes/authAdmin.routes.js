const express = require("express");
const { loginAdmin } = require("../controllers/auth.controller");
const { schemaLogin } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/login", schemaLogin, loginAdmin);

module.exports = router;
