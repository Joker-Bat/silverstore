const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, 'Review must have a product Id'],
      unique: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Review must have a user Id'],
    },
    reviewTitle: {
      type: String,
      required: [true, 'Review must have a review title'],
    },
    reviewDescription: {
      type: String,
      required: [true, 'Review must have a description'],
    },
    rating: {
      type: Number,
      required: [true, 'Review must have a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
