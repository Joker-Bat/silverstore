const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

module.exports = router;
