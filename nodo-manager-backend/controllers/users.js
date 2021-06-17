const usersRouter = require('express').Router()
const User = require('../models/user')
const authJwt = require('../utils/auth/authJWT')


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
usersRouter.get('/', authJwt.verifyToken, async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// UPDATE a user
usersRouter.put('/:id', async (req, res) => {
  const body = req.body

  const userWithUpdates = {
    name: body.name,
    username: body.username,
    passwordHash: body.passwordHash,
    clearance: body.clearance,
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, userWithUpdates, { new: true })

  res.json(updatedUser.toJSON())
})

// DELETE a user
usersRouter.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id)
  res.json(deletedUser.toJSON())
})


module.exports = usersRouter
