const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 2);
const moment = require('moment');

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
    type: Date,
  },
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

duesSchema.pre('save', async function(next) {
  this.nextDuesDate = moment().add(1, 'month');
  next();
});

const Dues = mongoose.model('Dues', duesSchema);
module.exports = Dues;