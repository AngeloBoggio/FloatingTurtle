const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the registering user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists !" });
    }

    // Create a user
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user !", error: err });
  }
};

exports.userSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user doesnt exist
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "User Does Not Exist!" });
    }
    // verify passwords
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
    const token = generateToken(existingUser.username);
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong 😢", Error: err.message });
  }
};
