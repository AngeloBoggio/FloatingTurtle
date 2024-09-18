const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const newProduct = Product({
      name,
      description,
      price,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
};
