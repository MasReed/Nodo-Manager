const usersRouter = require('express').Router()
const User = require('../models/user')
const Role = require('../models/role')
const authControl = require('../utils/auth/auth')
const authJwt = require('../utils/auth/authJWT')
const verifySignUp = require('../utils/auth/verifySignUp')


// CREATE new user via authentication utility
usersRouter.post('/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ], authControl.signup
)

// READ all users
usersRouter.get('/', authJwt.verifyToken, async (req, res) => {
  const users = await User.find({}).populate('roles')
  res.json(users)
})

// UPDATE a user
usersRouter.put('/:id', async (req, res) => {
  const body = req.body

  const userWithUpdates = {
    name: body.name,
    username: body.username,
    passwordHash: body.passwordHash,
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
