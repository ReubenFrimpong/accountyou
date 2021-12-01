const jwt = require('jsonwebtoken');
const AppError = require('../utils/app-error');
const User = require('../../models/user');
const { catchAsync } = require('../utils/catch-async');

exports.auth = (req, res, next) => {
  let token = req.headers.authorization;
  if(req.url === '/api/v1/login' || req.url === '/api/v1/logout') {
    return next();
  }
  if (!token) {
    return next(new AppError('Please provide a token', 401));
  }
  try{
    // token may contain the word bearer in it so we need to remove it
    token = token.split(' ')[1] || token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new AppError('Invalid token', 401));
    }
    next();
  } catch(err){
    return next(new AppError('Invalid token', 401));
  }
  
};

exports.admin = catchAsync(async (req, res, next) => {
  const { uid } = req.headers;
  const user = await User.findById(uid);
  if (!req.url.includes('disbursements')) {
    return next();
  }
  if (user.role !== 'admin') {
    return next(new AppError('You are not authorized to access this resource', 401))
  }
  return next();
});