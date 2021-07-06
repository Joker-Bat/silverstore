const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Encrypt the password before saving in database
userSchema.pre("save", async function (next) {
  // Only bcrypt if its modified from previous value
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre(/^find/, function (next) {
  // Only active users when finding2
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
