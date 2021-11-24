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
    select: false,
    required: [true, 'A password is required']
  },
  nextBillingDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
    enum: [true, false]
  },
  createdAt: Date,
  updatedAt: Date,
},{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;