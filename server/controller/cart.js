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

  // Check if user available with that id
  const user = await User.findById(id);
  if (!user) return next(new AppError("No user with that id", 400));

  // Check if user has cart
  const cart = await Cart.findOne({ user: id });
  // If user does not have cart create one and add products to array
  if (!cart) {
    await Cart.create({ user: id, products: { productId, count } });
  } else {
    // If user have cart then check if the productId is already present
    const curCarts = await Cart.find({
      user: id,
      "products.productId": productId,
    });
    // If user have cart but not have that product id then create new product and push into products array
    if (curCarts.length === 0) {
      await Cart.findOneAndUpdate(
        { user: id },
        { $push: { products: { productId, count } } }
      );
      // If user have that productId also then increment that product count only
    } else {
      Cart.findOne({ user: id })
        .then((doc) => {
          let items = doc.products;
          items.forEach((item) => {
            let curItem = item.productId === productId;
            if (curItem) {
              item.count += count;
            }
            return item;
          });
          doc.save();
        })
        .catch((err) => {
          console.log("Oh Dark its here", err);
        });
    }
  }
  res.status(200).json({
    status: "success",
    message: "Cart Saved",
  });
});

exports.getAllCarts = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const carts = await Cart.find({ user: id });
  const products = carts[0].products;

  res.status(200).json({
    status: "success",
    data: {
      carts: products,
    },
  });
});
