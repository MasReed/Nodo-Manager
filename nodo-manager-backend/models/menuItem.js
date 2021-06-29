const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An item name is required.']
  },
  description: String,
  ingredients: Array,
  category: String,
  price: Number,
  availability: String
})

module.exports = mongoose.model('MenuItem', menuItemSchema)
