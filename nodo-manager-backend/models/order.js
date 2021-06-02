const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderTime: { type: Date, default: Date.now },
  foodItems: Array,
  drinkItems: Array,
  subTotal: Number,
  taxRate: Number,
  taxAmount: Number,
  Total: Number
})

module.exports = mongoose.model('Order', orderSchema)
