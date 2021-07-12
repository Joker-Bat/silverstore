const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/user');
const Review = require('../models/review');

exports.addReview = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { productId } = req.params;
  const { reviewTitle, reviewDescription, rating } = req.body;

  const user = await User.findById(id);
  if (!user) return next(new AppError('No user with this id', 400));

  if (!productId || !reviewTitle || !reviewDescription || !rating)
    return next(new AppError('Provide all required fields', 400));

  const userReview = await Review.findOne({ user: id, productId });
  if (userReview) return next(new AppError('Users are only allowed to add one review for product', 400));

  await Review.create({ productId, user: id, reviewTitle, reviewDescription, rating });

  res.status(200).json({
    status: 'Success',
    message: 'Review added successfully',
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) return next(new AppError('Provide a product id', 400));

  const reviews = await Review.find({ productId })
    .populate({ path: 'user', select: 'name photo' })
    .select('-_id -__v -id');

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.removeReview = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { productId } = req.params;

  const user = await User.findById(id);
  if (!user) return next(new AppError('No user with this id', 400));

  const review = await Review.findOne({ productId, user: id });

  if (!review) return next(new AppError('This user no review for this product', 400));

  await Review.findOneAndDelete({ productId, user: id });

  res.status(200).json({
    status: 'success',
    message: 'Review deleted successfully',
  });
});
