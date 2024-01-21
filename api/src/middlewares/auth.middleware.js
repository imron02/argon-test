require("dotenv").config();
const jwt = require("jsonwebtoken");
const { checkSchema } = require("express-validator");

const schemaEmployeeLogin = checkSchema({
  email: {
    notEmpty: true,
    isEmail: true,
  },
  password: {
    notEmpty: true,
  },
});

const verifyToken = (req, res, next) => {
  const authHeader  = req.header("Authorization");
  
  if (!authHeader ) {
    return res
    .status(401)
    .json({ error: "Akses ditolak. Tidak ada token yang disediakan." });
  }

  const token = authHeader.substring(7);
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token salah." });
    }

    req.user = user;
    next();
  });
};

module.exports = { schemaEmployeeLogin, verifyToken };
