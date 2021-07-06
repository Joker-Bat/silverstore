const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
  passwordConfirm: {
    type: String,
    required: [true, "User must have a passwordConfirm..."],
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

// Encrypt the password before saving in database
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  // No need to store password confirm in DB
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  // Only active users when finding2
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
