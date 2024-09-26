const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.registerUser);
router.post("/signin", userController.userSignIn);

router.post("/cart/items", userController.addToCart);
router.get("/cart", userController.getCart);
module.exports = router;
