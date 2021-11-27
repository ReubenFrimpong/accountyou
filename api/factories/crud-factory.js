const { catchAsync } = require('../utils/catch-async');

exports.getAll = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.find();
  res.status(200).json({
    status: 'success',
    data: doc
  });
});