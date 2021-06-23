const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  passwordHash: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // Don't reveal password hash
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
