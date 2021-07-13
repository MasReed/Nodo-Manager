const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  time: Date,
  status: String,
  category: String,
  name: String,
  items: Array,
  notes: String,
  costs: {
    subTotal: Number,
    taxRate: Number,
    taxAmount: Number,
    total: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Forward mongoose errors to errorHandler middleware
orderSchema.post('save', (err, doc, next) => {
  try {
    if (err) {
      throw { status: 400, message: err.message }
    }
  } catch (err) {
    next(err)
  }
})

module.exports = mongoose.model('Order', orderSchema)
