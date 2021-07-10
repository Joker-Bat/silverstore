const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  updatePassword,
} = require("../controller/auth");

const { profile, updateProfilePicture } = require("../controller/user");
const { protect } = require("../middleware/auth");
const { upload, resize } = require("../middleware/upload");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);

// Below routes are protected
router.use(protect);

router.get("/logout", logout);
router.get("/profile", profile);
router.patch("/updatepassword", updatePassword);
router.patch("/updateprofilepicture", upload, resize, updateProfilePicture);

module.exports = router;
