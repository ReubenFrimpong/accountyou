const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A userId is required']
  },
  name: {
    type: String,
    required: [true ,'Category name is required']
  },
  categoryType: {
    type: String,
    required: [true ,'Category type is required'],
    enum: ['income','expenditure']
  }
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;  