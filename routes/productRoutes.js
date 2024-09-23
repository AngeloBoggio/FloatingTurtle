const express = require("express");
const { createProduct, updateStock } = require("../controllers/productController");
const router = express.Router();

// Define a POST route to create a new product
router.post("/addproduct", createProduct);

// Define a PUT route to change the stock amount of a product when a user "Buys" a product.
router.put("/updateproduct", )

module.exports = router.put("/updateStock", );
