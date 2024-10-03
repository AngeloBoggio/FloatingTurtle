const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, imageURL } = req.body;

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      // If the product exists, increase the stock
      existingProduct.stock += stock; // Update stock amount
      const updatedProduct = await existingProduct.save(); // Save updated product
      return res.status(200).json(updatedProduct); // Respond with updated product
    }

    const newProduct = new Product({
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

exports.updateStock = async (req, res) => {
  try {
    const { name, stock } = req.body;
    const existingProduct = await Product.findOne({ name });

    // If the product doesn't exist
    if (!existingProduct) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    // Ensure the stock doesn't go negative
    if (existingProduct.stock < stock) {
      return res
        .status(400)
        .json({ message: "Not enough in stock for purchase" });
    }

    // Subtract the stock
    existingProduct.stock -= stock;
    await existingProduct.save();

    // Return success response
    return res.status(200).json({
      message: "Stock updated successfully",
      product: existingProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the stock",
      error: error.message,
    });
  }
};

exports.removeProduct = async (req, res) => {};
