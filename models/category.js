const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true ,'Category name is required']
  },
  type: {
    type: String,
    required: [true ,'Category type is required'],
    enum: ['income','expenditure']
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;  