const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Cart item must have a user"],
  },
  products: {
    type: [
      {
        productId: String,
        count: Number,
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
