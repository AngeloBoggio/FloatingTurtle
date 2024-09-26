const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.registerUser);
router.post("/signin", userController.userSignIn);
router.post("/addtocart", userController.addToCart);

module.exports = router;
