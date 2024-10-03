const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const Product = require("../models/productModel");

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
    const token = generateToken({
      id: existingUser._id,
      username: existingUser.username,
    });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong 😢", Error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.shoppingCart.push({
      product: product._id,
      quantity: 1,
    });

    await user.save();
    res
      .status(200)
      .json({ message: "Product added to cart", cart: user.shoppingCart });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding product to cart", error: err });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.user._id;

  try {
    const user = await User.findById(userId).populate("shoppingCart.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.shoppingCart);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving cart items", error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const user = req.user._id;
  try {
    const productIndex = user.shoppingCart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    user.shoppingCart.splice(productIndex, 1);

    await user.save();
    res.status(200).json({
      message: "Product removed from the cart",
      cart: user.shoppingCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error removing product from cart",
      error: error.message,
    });
  }
};

exports.signOut = async (req, res) => {};

exports.checkout = async (req, res) => {};

exports.wishlist = async (req, res) => {};
