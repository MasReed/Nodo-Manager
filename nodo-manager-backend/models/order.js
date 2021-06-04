const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  category: String,
  name: String,
  items: Array,
  notes: String,
  subTotal: Number,
  taxRate: Number,
  taxAmount: Number,
  Total: Number
})

module.exports = mongoose.model('Order', orderSchema)
