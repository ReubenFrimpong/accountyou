const { create } = require('../factories/crud-factory');
const Dues = require('../../models/dues');
const { catchAsync } = require('../utils/catch-async');
const { sendResponse } = require('../utils/rest-response');

const fillable = ['userId', 'amount'];
exports.payDues = create(Dues, fillable);

exports.totalDuesPaid = catchAsync(async (req, res, next) => {
  const totalDues = await Dues.aggregate([
    { 
      $group: { 
        _id: null,
        totalDues: { $sum: "$amount" },
        count: { $sum: 1 }
       } 
    }
  ]);
  sendResponse(res, 200, totalDues);
});