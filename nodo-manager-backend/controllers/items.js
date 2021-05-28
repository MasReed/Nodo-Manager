const itemsRouter = require('express').Router()
const MenuItem = require('../models/menuItem')

// get entire list of menu items
itemsRouter.get('/', (req, res) => {
  MenuItem
    .find({})
    .then(items =>
      res.json(items)
    )
})

module.exports = itemsRouter
