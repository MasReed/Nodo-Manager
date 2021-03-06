const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'An email address is required.']
  },
  username: {
    type: String,
    required: [true, 'A username is required.']
  },
  passwordHash: {
    type: String,
    required: [true, 'A password is required.']
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // Don't reveal password hash
    delete returnedObject.passwordHash
  }
})

// Forward mongoose errors to errorHandler middleware
userSchema.post('save', (err, doc, next) => {
  try {
    if (err) {
      throw { status: 400, message: err.message }
    }
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('User', userSchema)
