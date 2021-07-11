const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Cart = require("../models/cart");
const User = require("../models/user");

exports.getWelcome = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Connected",
  });
};

exports.addCart = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { productId, count } = req.body;

  const user = await User.findById(id);
  if (!user) return next(new AppError("No user with that id", 400));

  const cart = await Cart.findOne({ user: id });
  if (!cart) {
    await Cart.create({ user: id, $push: { products: { productId, count } } });
  } else {
    await Cart.findOneAndUpdate(
      { user: id },
      { $push: { products: { productId, count } } }
    );
  }

  res.status(200).json({
    status: "success",
    message: "Cart Saved",
  });
});

exports.getAllCarts = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const carts = await Cart.find({ user: id });

  res.status(200).json({
    status: "success",
    data: {
      carts,
    },
  });
});
