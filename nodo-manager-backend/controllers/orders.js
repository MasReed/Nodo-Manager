const ordersRouter = require('express').Router()
const Order = require('../models/order')
const authJwt = require('../utils/auth/authJWT')


// CREATE new order
ordersRouter.post('/', async (req, res) => {
  const body = req.body

  const newOrderObject = new Order({
    time: Date.now(),
    status: body.status,
    category: body.category,
    name: body.name,
    items: body.items,
    notes: body.notes,
    subTotal: body.subTotal,
    taxRate: body.taxRate,
    taxAmount: body.taxAmount,
    total: body.total
  })
  //SOME OF THESE GET CALCULATED IN MIDDLEWARE...?

  const savedOrder = await newOrderObject.save()
  res.json(savedOrder.toJSON())
})

// READ all orders
ordersRouter.get('/', authJwt.verifyToken, async (req, res) => {
  const orders = await Order.find({})
  res.json(orders)
})

// READ an order
ordersRouter.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id)
  res.json(order)
})

// UPDATE an order
ordersRouter.put('/:id', async (req, res) => {
  const body = req.body
  const orderWithUpdates = {
    time: Date.now(),
    status: body.status,
    category: body.category,
    name: body.name,
    items: body.items,
    notes: body.notes,
    subTotal: body.subTotal,
    taxRate: body.taxRate,
    taxAmount: body.taxAmount,
    total: body.total
  }
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, orderWithUpdates, { new: true })
  res.json(updatedOrder.toJSON())
})

// DELETE an order
ordersRouter.delete('/:id', async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id)
  res.json(deletedOrder.toJSON())
})

module.exports = ordersRouter
