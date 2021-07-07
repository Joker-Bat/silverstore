const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Check if token is present in header or in cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not authorized to access this page", 401)
    );
  }
  // Check if user available for that id
  const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("Token Expired or invalid", 401));

  // Check if user changed password after token issued
  if (user.checkPasswordChangedAfterToken(decoded.iat))
    return next(
      new AppError("This user recently changed password login again.", 401)
    );

  req.user = user;
  next();
});
