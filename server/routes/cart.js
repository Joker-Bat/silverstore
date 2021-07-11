const express = require("express");

const { getWelcome, addCart, getAllCarts } = require("../controller/cart");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getWelcome);

router.post("/add", protect, addCart);
router.get("/getall", protect, getAllCarts);

module.exports = router;
