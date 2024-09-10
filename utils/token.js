const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

const generateToken = (username) => {
  secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(username, secretKey, { expiresIn: "1hr" });
  return token;
};

module.exports = { generateToken };
