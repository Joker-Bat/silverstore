const express = require("express");
const cors = require("cors");

const app = express();

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

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

module.exports = app;
