const express = require('express');

const { signup, login, forgotPassword, resetPassword, logout, updatePassword } = require('../controller/auth');

const { profile, updateProfilePicture, updateProfile, isLoggedIn } = require('../controller/user');
const { protect } = require('../middleware/auth');
const { upload, resize } = require('../middleware/upload');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);
// Logout is not protected it will cause problem when signed in multiple device and changed password in one device the another one not able to logout
router.get('/logout', logout);

// Below routes are protected
router.use(protect);

router.get('/isloggedin', isLoggedIn);

router.get('/profile', profile);
router.patch('/updatepassword', updatePassword);
router.patch('/updateprofilepicture', upload, resize, updateProfilePicture);
router.patch('/updateprofile', updateProfile);

module.exports = router;
