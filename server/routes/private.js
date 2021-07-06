const express = require("express");

const router = express.Router();

const { privatePage } = require("../controller/private");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, privatePage);

module.exports = router;
