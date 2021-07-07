exports.profile = (req, res, next) => {
  res.status(200).send(`Welcome ${req.user.name}`);
};
