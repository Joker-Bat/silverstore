const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cart');

exports.addCart = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { productId, count } = req.body;

  // Check if user has cart
  const cart = await Cart.findOne({ user: id, productId });

  if (!cart) {
    await Cart.create({ user: id, productId, count });
  } else {
    await Cart.findOneAndUpdate({ user: id, productId }, { $inc: { count } });
  }

  res.status(200).json({
    status: 'success',
    message: 'Cart Saved',
  });
});

exports.getAllCarts = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const carts = await Cart.find({ user: id }).select('-__v -_id');

  res.status(200).json({
    status: 'success',
    result: carts.length,
    data: {
      carts,
    },
  });
});

exports.removeCart = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { productId } = req.params;

  if (!productId) return next(new AppError('Provide a product Id', 400));

  const cart = await Cart.findOne({ user: id, productId });
  if (!cart) return next(new AppError('User has no cart', 400));

  await Cart.findOneAndDelete({ user: id, productId });

  res.status(200).json({
    status: 'success',
    message: 'Cart successfully removed',
  });
});
