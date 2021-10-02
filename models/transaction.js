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
  type:{
    type: String,
    required: [true, 'A type is required for a transaction'],
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
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Transaction = mongoose.model('Expense', transactionSchema);
module.exports = Transaction;