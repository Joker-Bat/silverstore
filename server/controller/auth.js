const crypto = require("crypto");

const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");

const createSendToken = (user, statusCode, req, res) => {
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
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new AppError("Provide name, email and password", 400));

  const newUser = await User.create({
    name,
    email,
    password,
  });

  // Dont show active on Response
  newUser.active = undefined;
  const url = `http://localhost:3000/profile`;
  const message = `
    <h3>Successfully signed up to SilverStore</h3>
    <p>Thank you for signing up for SilverStore account</p>
    <p>Click link below to go to you profile</p>
    <a href=${url} clicktracking="off">${url}</a>
  `;

  await new Email(newUser, message).sendWelcome();

  createSendToken(newUser, 201, req, res);
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
  if (!curUser || !(await curUser.matchPasswords(password, curUser.password)))
    return next(new AppError("Email and password does not match!", 401));

  createSendToken(curUser, 200, req, res);
});

/**
 * Forgot Password
 */

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new AppError("Provide a email...", 401));
  const user = await User.findOne({ email });

  if (!user) return next(new AppError("There is no user with that email", 404));

  const resetToken = user.getPasswordResetToken();

  await user.save();

  try {
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

    const message = `
      <h3>Hi ${user.name} you have requested for password reset</h3>
      <p>Please click the link below to further processing</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  
      <h6>Ignore this email if haven't asked for password reset.</h6>
      <p>This link only valid for 10min</p>
    `;

    await new Email(user, message).sendPasswordResetToken();

    // Clear JWT Cookie
    res.cookie("jwt", "loggedOut", {
      maxAge: Date.now() + 5 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      message: "Reset password URL send to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later", 500)
    );
  }
});

/**
 * ResetPassword
 */

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) return next(new AppError("Token invalid or expired!", 400));
  if (!password) return next(new AppError("Provide your new password", 400));

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Token invalid or expired!", 400));

  user.password = password;
  user.passwordResetToken = undefined;
  user.resetTokeExpires = undefined;

  await user.save();

  const url = `http://localhost:3000/profile`;

  const message = `
    <h3>Hi ${user.name} Successfully Changed your password</h3>
    <p>Click link below to go to your profile</p>
    <a href=${url} clicktracking="off">${url}</a>
  `;

  await new Email(user, message).sendResetPasswordSuccess();

  res.status(200).json({
    status: "success",
    message: "Successfully changed your password",
  });
});

/**
 * Logout
 */

exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedOut", {
    maxAge: Date.now() + 5 * 1000,
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

/**
 * UpdatePassword
 */

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new AppError("Provide your old and new password"));

  const { user } = req;
  const curUser = await User.findById(user.id).select("+password");
  if (
    !curUser ||
    !(await curUser.matchPasswords(oldPassword, curUser.password))
  )
    return next(new AppError("passwords does not match", 401));

  curUser.password = newPassword;
  await curUser.save();

  createSendToken(curUser, 200, req, res);
});
