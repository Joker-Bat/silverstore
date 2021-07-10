const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const User = require("../models/user");

exports.profile = (req, res, next) => {
  const user = req.user;
  user.passwordChangedAt = undefined;
  user.resetTokenExpires = undefined;

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

exports.updateProfilePicture = catchAsync(async (req, res, next) => {
  const { file } = req;
  const { id } = req.user;

  if (!file) return next(new AppError("Select any image", 400));

  const user = await User.findByIdAndUpdate(
    id,
    { photo: file.filename },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
