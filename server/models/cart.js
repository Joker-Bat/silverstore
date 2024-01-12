const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Cart item must have a user'],
  },
  productId: {
    type: String,
    required: [true, 'Cart must have a produtc Id'],
  },
  count: {
    type: Number,
    requird: [true, 'Cart must have a product count'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Populate User Schema
CartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
    strictPopulate: false,
  });
  next();
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
