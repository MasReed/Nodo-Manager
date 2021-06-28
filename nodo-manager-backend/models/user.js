const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'An email address is required.'],
    unique: [true, 'Email address already in use.']
  },
  username: {
    type: String,
    required: [true, 'Enter a username'],
    unique: [true, 'Username already in use.']
  },
  passwordHash: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
})

// userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // Don't reveal password hash
    delete returnedObject.passwordHash
  }
})

userSchema.pre('save', (err, doc, next) => {
  console.log('ERR::::::::')
  console.log(err)
  next(err)
})

module.exports = mongoose.model('User', userSchema)
