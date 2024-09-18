const express = require("express");
const { createProduct } = require("../controllers/productController");
const router = express.Router();

// Define a POST route to create a new product
router.post("/products", createProduct);

module.exports = router;
