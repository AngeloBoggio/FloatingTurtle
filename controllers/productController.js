const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, imageURL } = req.body;

    const newProduct = Product({
      name,
      description,
      category,
      price,
      stock,
      imageURL,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateStock = async (req, res) => {
  try{
    const{name, stock} = req.body;

  } catch {

  }
}

module.exports = {
  createProduct,
  updateStock,
};
