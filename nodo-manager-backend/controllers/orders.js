const ordersRouter = require('express').Router()
const Order = require('../models/order')
const authJwt = require('../utils/auth/authJWT')
const orderValidation = require('../utils/validations/orderValidation')


// CREATE new order
ordersRouter.post('/', [
  authJwt.verifyToken,
  orderValidation.verifyCosts
], async (req, res, next) => {
  
  try {
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

    const savedOrder = await newOrderObject.save()
    res.json(savedOrder.toJSON())

  } catch (err) {
    next(err)
  }
})

// READ all orders
ordersRouter.get('/', authJwt.verifyToken, async (req, res, next) => {
  try {
    const orders = await Order.find({})
    res.json(orders)

  } catch (err) {
    next(err)
  }
})

// READ an order
ordersRouter.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    res.json(order)

  } catch (err) {
    next(err)
  }
})

// UPDATE an order
ordersRouter.put('/:id', orderValidation.verifyCosts, async (req, res, next) => {
  try {
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

  } catch (err) {
    next(err)
  }
})

// DELETE an order
ordersRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    res.json(deletedOrder.toJSON())

  } catch (err) {
    next(err)
  }
})

module.exports = ordersRouter
