const itemsRouter = require('express').Router()
const MenuItem = require('../models/menuItem')
const authJwt = require('../utils/auth/authJWT')


// CREATE new menu item
itemsRouter.post('/', async (req, res, next) => {
  const body = req.body

  const newItem = new MenuItem ({
    name: body.name,
    description: body.description,
    ingredients: body.ingredients,
    category: body.category,
    price: body.price,
    availability: body.availability
  })

  try {
    const savedItem = await newItem.save()
    res.json(savedItem.toJSON())
  } catch (err) {
    next(err)
  }
})

// READ all menu items
itemsRouter.get('/', async (req, res, next) => {
  try {
    const items = await MenuItem.find({})
    res.json(items)
  } catch (err) {
    next(err)
  }
})

// UPDATE a menu item
itemsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const itemWithUpdates = {
    name: body.name,
    description: body.description,
    ingredients: body.ingredients,
    category: body.category,
    price: body.price,
    availability: body.availability
  }

  const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, itemWithUpdates, { new: true })

  res.json(updatedItem.toJSON())
})

// DELETE a menu item
itemsRouter.delete('/:id', async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = itemsRouter
