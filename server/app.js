const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");

// Our modules
const globalErrorController = require("./controller/errorController");
const AppError = require("./utils/appError");

const app = express();

// Parse incoming data
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cors());

// Compressing Response
app.use(compression());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Its working",
  });
});

app.post("/", (req, res, next) => {
  const body = req.body;
  console.log(body);
  res.status(200).json({
    status: "success",
    message: "Posted",
    data: body,
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
