const mongoose = require('mongoose');
const { isEmail } = require('validator')
const { Schema } = mongoose;

const { hashPassword } = require('../utils/bcrypt');

let userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate: [isEmail, 'Email format is invalid']
  },
  password: String,
  telephone: {
    type: String,
    // validate: {
    //   validator: (v) => /\d{3}-\d{3}-\d{4}/.test(v),
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
    required: [true, 'User phone number required'],
    unique: true,
  }
}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.password = hashPassword(this.password);
  }
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  if (this.password && (this.isNew || this.isModified('password'))) {
    this.password = hashPassword(this.password);
  }
  next();
});

userSchema.pre('findByIdAndUpdate', function (next) {
  if (this.password && (this.isNew || this.isModified('password'))) {
    this.password = hashPassword(this.password);
  }
  next();
})

userSchema.methods.toPublic = function () {
  return {
    id: this._id,
    username: this.username,
    telephone: this.telephone
  }
}

module.exports = mongoose.model('User', userSchema);
