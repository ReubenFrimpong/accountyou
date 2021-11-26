const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { catchAsync } = require('../utils/catch-async');
const crudFactory = require('../factories/crud-factory');

exports.getAllUsers = crudFactory.getAll(User);

exports.createUser =  catchAsync(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  res.json({
    token,
    data: {
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.json({
    data: {
      user
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({
    data: {
      message: 'User deleted successfully'
    }
  });
});