const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  updatePassword,
} = require("../controller/auth");

const { profile } = require("../controller/user");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", protect, logout);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);

router.get("/profile", protect, profile);
router.patch("/updatepassword", protect, updatePassword);

module.exports = router;
