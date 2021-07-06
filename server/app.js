const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

// Our modules
const globalErrorController = require("./middleware/error");
const AppError = require("./utils/appError");
const userRouter = require("./routes/user");
const privateRouter = require("./routes/private");

const app = express();

// Parse incoming data
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cors());

// Parse cookies to req.cookies
app.use(cookieParser());
// Compressing Response
app.use(compression());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/private", privateRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
