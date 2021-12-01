const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 2);

const duesSchema = mongoose.Schema({
  userId:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A userId is required for dues']
  },
  amount:{
    type: Float,
    required: [true, 'An amount is required for dues'],
  },
  nextDuesDate:{
    type: Boolean,
    default: false
  },
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Dues = mongoose.model('Dues', duesSchema);
module.exports = Dues;