const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An item name is required.']
  },
  description: String,
  ingredients: [String],
  category: String,
  price: Number,
  availability: String
})

menuItemSchema.post('save', (err, doc, next) => {
  try {
    if (err) {
      throw { status: 400, message: err.message }
    }
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('MenuItem', menuItemSchema)
