const itemsRouter = require('express').Router()
const MenuItem = require('../models/menuItem')
const authJwt = require('../utils/auth/authJWT')
const itemValidation = require('../utils/validations/itemValidation')


// CREATE new menu item
itemsRouter.post('/', [
    itemValidation.checkEmptyObject,
    itemValidation.checkRequiredPropertiesDefined,
    itemValidation.checkOptionalPropertiesDefinedDefault,
    itemValidation.checkPositiveItemPrice
  ],
    async (req, res, next) => {

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
itemsRouter.put('/:id',
  [
    itemValidation.checkEmptyObject,
    itemValidation.checkRequiredPropertiesDefined,
    itemValidation.checkOptionalPropertiesDefinedDefault,
    itemValidation.checkPositiveItemPrice
  ],
  async (req, res, next) => {
    const body = req.body

    const itemWithUpdates = {
      name: body.name,
      description: body.description,
      ingredients: body.ingredients,
      category: body.category,
      price: body.price,
      availability: body.availability
    }

    try {
      const updatedItem = await MenuItem
        .findByIdAndUpdate(req.params.id, itemWithUpdates, { new: true })
      res.json(updatedItem.toJSON())
    } catch (err) {
      next(err)
    }
})

// DELETE a menu item
itemsRouter.delete('/:id', async (req, res, next) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = itemsRouter
