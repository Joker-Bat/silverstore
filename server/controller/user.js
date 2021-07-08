exports.profile = (req, res, next) => {
  const user = req.user;
  user.passwordChangedAt = undefined;
  user.resetTokenExpires = undefined;

  res.status(200).json({
    status: "success",
    data: { user },
  });
};
