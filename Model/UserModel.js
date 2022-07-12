const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must need a email'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please enter a valid email'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'leader', 'guide'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'password is needed'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'password is needed'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'password is not matched',
    },
  },
});

userSchema.methods.isPassChanged = (tokenTime) => {
  if (this.changedAt) {
    return this.changedAt > tokenTime;
  }

  return false;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
