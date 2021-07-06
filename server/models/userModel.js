const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name..."],
    maxLength: [100, "User name must below 100 characters..."],
  },
  email: {
    type: String,
    required: [true, "User must have a email..."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "User must have a password..."],
    select: false,
  },
  passwordConform: {
    type: String,
    required: [true, "User must have a passwordConform..."],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Password are not equal",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre(/^find/, function (next) {
  // Only active users when finding2
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.Model("User", userSchema);

module.exports = User;
