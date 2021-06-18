const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  status: { type: String, default: 'In Progress' },
  category: String,
  name: String,
  items: Array,
  notes: String,
  subTotal: Number,
  taxRate: Number,
  taxAmount: Number,
  total: Number
})

module.exports = mongoose.model('Order', orderSchema)
