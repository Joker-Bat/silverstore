const express = require("express");

const { getWelcome } = require("../controller/cart");

const router = express.Router();

router.get("/", getWelcome);

module.exports = router;
