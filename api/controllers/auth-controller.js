const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { catchAsync } = require('../utils/catch-async');
const AppError = require('../utils/app-error');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or password', 401));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});