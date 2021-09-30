const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 2);

const transactionSchema = mongoose.Schema({
  categoryId:{
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'A category is required for an expense']
  },
  type:{
    type: String,
    required: [true, 'A type is required for an expense'],
    enum: ['income','expenditure']
  },
  status:{
    type: String,
    required: true,
    default: 'recurrent',
    enum: ['fixed', 'recurrent']
  },
  amount:{
    type: Float,
  },
  description: String,
  receipts: [String],
  date: Date,
  createdAt: Date,
  updatedAt: Date,
});

const Transaction = mongoose.model('Expense', transactionSchema);
module.exports = Transaction;