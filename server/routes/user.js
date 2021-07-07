const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/auth");

const { profile } = require("../controller/user");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

router.get("/profile", protect, profile);

module.exports = router;
