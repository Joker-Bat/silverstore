const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/user');

exports.profile = (req, res, next) => {
  const user = req.user;
  user.passwordChangedAt = undefined;
  user.resetTokenExpires = undefined;

  res.status(200).json({
    status: 'success',
    data: { user },
  });
};

exports.updateProfilePicture = catchAsync(async (req, res, next) => {
  const { file } = req;
  const { id } = req.user;

  if (!file) return next(new AppError('Select any image to update profile', 400));

  await User.findByIdAndUpdate(id, { photo: file.filename }, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    message: 'Successfully updated profile picture',
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { name, email } = req.body;

  if (!name || !email) return next(new AppError('Provide email or name to update profile', 400));

  await User.findByIdAndUpdate(id, { name: name, email: email }, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    message: 'Successfully updated profile',
  });
});

exports.isLoggedIn = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'you ara logged in',
  });
};
