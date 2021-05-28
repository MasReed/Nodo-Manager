const usersRouter = require('express').Router()
const User = require('../models/user')

// CREATE new user
usersRouter.post('/', async (req, res) => {
  const body = req.body

  const newUser = new User({
    name: body.name,
    username: body.username,
    passwordHash: body.password,
    clearance: body.clearance || 'standard'
  })

  const savedUser = await newUser.save()
  res.json(savedUser.toJSON())
})

// READ all users
usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


module.exports = usersRouter
