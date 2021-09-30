const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const userSchema = mongoose.Schema({
  username:{
    type: String,
    required: [true, 'A username is required']
  },
  email:{
    type: String, 
    validate: validators.isEmail(),
    unique: true,
    dropsDups: true,
  },
  password:{
    type: String,
    required: [true, 'A password is required']
  }
});