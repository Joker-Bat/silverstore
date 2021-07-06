exports.privatePage = (req, res, next) => {
  res.status(200).send("You have access to private route");
};
