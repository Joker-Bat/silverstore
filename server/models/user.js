const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
  passwordChangedAt: Date,
  passwordResetToken: String,
  resetTokenExpires: Date,
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

// Only update the password Changed for current user change password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  // This takes some time so we use simple 1s past hack
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // Only active users when finding2
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.matchPasswords = async function (password, curPassword) {
  return await bcrypt.compare(password, curPassword);
};

userSchema.methods.getSignToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Valid for 10min
  this.resetTokenExpires = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

userSchema.methods.checkPasswordChangedAfterToken = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
