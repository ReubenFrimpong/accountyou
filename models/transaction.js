const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 2);

const transactionSchema = mongoose.Schema({
  userId:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A userId is required for a transaction']
  },
  categoryId:{
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'A category is required for a transaction']
  },
  transactionType:{
    type: String,
    required: [true, 'A type is required for a transaction'],
    enum: ['income','expense']
  },
  recurring:{
    type: Boolean,
    default: false
  },
  recurringPeriod: Date,
  amount:{
    type: Float,
  },
  description: String,
  receipts: [String],
  date: Date,
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;