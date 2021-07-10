const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");

const multerStorage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb("filetype");
}

const multerUpload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

exports.upload = multerUpload.single("photo");

exports.resize = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
});
