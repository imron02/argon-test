const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
};

module.exports = { generateToken };
