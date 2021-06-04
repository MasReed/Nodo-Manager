const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: Array,
  category: String,
  price: Number,
  availability: String
})

module.exports = mongoose.model('MenuItem', menuItemSchema)
