const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An item name is required.']
  },
  description: {
    type: String,
    default: ''
  },
  ingredients: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: [true, 'Item must have a category.']
  },
  price: {
    type: Number,
    required: [true, 'Item must have a price.']
  },
  availability: {
    type: String,
    default: 'Unavailable'
  }
})

// Forward mongoose errors to errorHandler middleware
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
