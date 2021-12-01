const mongoose = require('mongoose');

const disbursementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A userId is required']
  },
  amount: {
    type: String,
    required: [true ,'Category name is required']
  }
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Disbursement = mongoose.model('Disbursement', disbursementSchema);

module.exports = Disbursement;  