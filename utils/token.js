const jwt = require("jsonwebtoken");
const env = require("dotenv");

env.config();

const generateToken = (username) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ username: username }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { generateToken };
