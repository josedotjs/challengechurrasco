const mongoose = require('mongoose')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  role: String,
  active: {
    type: Boolean,
    default: true,
  },
  firstName: String,
  lastName: String,
  birthday: Date,
})

UserSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  const hash = crypto
    .createHash('sha256')
    .update(user.password)
    .digest('hex')

  user.password = hash
  next()
})

UserSchema.methods.comparePassword = function(candidate) {
  return (
    crypto
      .createHash('sha256')
      .update(candidate)
      .digest('hex') === this.password
  )
}

module.exports = mongoose.model('user', UserSchema) // por defecto mongoose pluralizar user
