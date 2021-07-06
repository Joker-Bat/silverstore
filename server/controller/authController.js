const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// JWT Token
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  // Send as cookie
  res.cookie("jwt", token, {
    maxAge: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure || req.headers("x-forwarded-proto") === "https",
  });

  // Hide password and photo from response
  user.password = undefined;
  user.photo = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

/**
 * SignUP
 */

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Dont show active on Response
  newUser.active = undefined;

  createSendToken(newUser, 201, req, res);
});

/**
 * Login
 */

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // If not valid email or password
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));
  // check user exist with that email
  const curUser = await User.findOne({ email }).select("+password");
  // If no user present for email
  if (!curUser || !(await curUser.correctPassword(password, curUser.password)))
    return next(new AppError("Email and password does not match!", 401));

  createSendToken(curUser, 200, req, res);
});
