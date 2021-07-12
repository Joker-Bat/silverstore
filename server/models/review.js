const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, 'Review must have a product Id'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
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

// Populate user name and photo
ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo -_id',
  });
  next();
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
