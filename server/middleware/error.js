const AppError = require("../utils/appError");

const handleDuplicateFields = (err) => {
  const message = `This Email is already used please use another email...`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError(`Invalid token please log in again!`, 401);

const handleJWTExpired = () =>
  new AppError("Your token has expired! please log in again :)", 401);

const sendError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.log("Error in Production 1: ", err);

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.statuse || "Error";

  console.log(err);

  let error = { ...err };
  error.message = err.message;

  if (err.name === "ValidationError") error = handleValidationError(error);
  if (err.code === 11000) error = handleDuplicateFields(error);
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpired();

  sendError(error, req, res);
};
