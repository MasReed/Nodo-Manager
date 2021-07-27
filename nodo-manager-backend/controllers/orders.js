const ordersRouter = require('express').Router()
const Order = require('../models/order')
const authJwt = require('../utils/auth/authJWT')
const orderValidation = require('../utils/validations/orderValidation')

// CREATE new order
ordersRouter.post('/',
  [
    // Middlewares
    authJwt.verifyToken,
    orderValidation.verifyStatus,
    orderValidation.verifyCategory,
    orderValidation.verifyName,
    orderValidation.verifyItems,
    orderValidation.verifyNotes,
    orderValidation.verifyCosts,
  ], async (req, res, next) => {

  try {
    const body = req.body

    const newOrderObject = new Order({
      status: body.status,
      category: body.category,
      name: body.name,
      items: body.items,
      notes: body.notes,
      costs: {
        subTotal: body.costs.subTotal,
        taxRate: body.costs.taxRate,
        taxAmount: body.costs.taxAmount,
        total: body.costs.total
      },
      user: req.userId
    })

    const savedOrder = await newOrderObject.save()
    res.json(savedOrder.toJSON())

  } catch (err) {
    next(err)
  }
})

// READ all orders
ordersRouter.get('/',
  [
    authJwt.verifyToken,
    authJwt.isEmployee
  ], async (req, res, next) => {

  try {
    const orders = await Order.find({}).populate('user')
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
ordersRouter.put('/:id',
  [
    authJwt.verifyToken,
    authJwt.isEmployee,
    orderValidation.verifyStatus,
    orderValidation.verifyCategory,
    orderValidation.verifyName,
    orderValidation.verifyItems,
    orderValidation.verifyNotes,
    orderValidation.verifyCosts,
  ], async (req, res, next) => {

  try {
    const body = req.body

    const orderWithUpdates = {
      status: body.status,
      category: body.category,
      name: body.name,
      items: body.items,
      notes: body.notes,
      costs: {
        subTotal: body.costs.subTotal,
        taxRate: body.costs.taxRate,
        taxAmount: body.costs.taxAmount,
        total: body.costs.total
      },
      user: req.userId
    }

    const updatedOrder = await Order
      .findByIdAndUpdate(req.params.id, orderWithUpdates, { new: true })

    res.json(updatedOrder.toJSON())

  } catch (err) {
    next(err)
  }
})

// DELETE an order
ordersRouter.delete('/:id',
  [
    authJwt.verifyToken,
    authJwt.isManager
  ], async (req, res, next) => {

  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    res.json(deletedOrder.toJSON())

  } catch (err) {
    next(err)
  }
})

module.exports = ordersRouter
