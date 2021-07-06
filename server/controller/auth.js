const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createSendToken = (user, statusCode, res) => {
  const token = user.getSignToken();
  // Send as cookie
  res.cookie("jwt", token, {
    maxAge: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // Below is only when hosting
    // secure: req.secure || req.headers("x-forwarded-proto") === "https",
  });

  // Hide password and photo from response
  user.password = undefined;
  user.photo = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
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
  });

  // Dont show active on Response
  newUser.active = undefined;

  createSendToken(newUser, 201, res);
});

/**
 * Login
 */

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const curUser = await User.findOne({ email }).select("+password");

  // If no user present for that email
  if (!curUser || !(await curUser.matchPasswords(password)))
    return next(new AppError("Email and password does not match!", 401));

  createSendToken(curUser, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new AppError("Provide a email...", 401));
  const user = await User.findOne({ email });

  if (!user) return next(new AppError("There is no user with that email", 404));

  const resetToken = user.getPasswordResetToken();

  await user.save();

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `
    <h1>You have requested for password reset</h1>
    <p>Please click the link below to further processing</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

    <h2>Ignore this email if haven't asked for password reset.</h2>
    <p>This link only valid of 10min</p>
  `;
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  res.send("Works");
});
