const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err: err,
      stack: err.stack,
    });
  }

  // Render a Error page
  console.error("ERROR in development", err);

  return res.status(err.statusCode).render("Somethin Went Wrong");
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
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
  }

  // Render a Error page
  console.error("ERROR in production", err);

  return res.status(err.statusCode).render("Somethin Went Wrong");
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.statuse || "Error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, req, res);
  }
};
