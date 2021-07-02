const usersRouter = require('express').Router()
const User = require('../models/user')
const Role = require('../models/role')
const authControl = require('../utils/auth/auth')
const authJwt = require('../utils/auth/authJWT')
const verifySignUp = require('../utils/auth/verifySignUp')


// CREATE new user via authentication utility
usersRouter.post('/signup',
  [
    verifySignUp.checkUsernameOrEmailExists,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    verifySignUp.checkAuthenticatedRoleCreator
  ], authControl.signup
)

// READ all users
usersRouter.get('/',
  [
    authJwt.verifyToken,
    authJwt.isEmployee
  ], async (req, res, next) => {

  try {
    const users = await User.find({}).populate('role')
    res.json(users)

  } catch (err) {
    next(err)
  }
})

// UPDATE a user
usersRouter.put('/:id',
  [
    authJwt.verifyToken,
    authJwt.isAdmin
  ], async (req, res, next) => {

  const body = req.body

  const userWithUpdates = {
    name: body.name,
    username: body.username,
    passwordHash: body.passwordHash,
    role: body.role
  }

  try {
    const updatedUser = await User
      .findByIdAndUpdate(req.params.id, userWithUpdates, { new: true })
    res.json(updatedUser.toJSON())

  } catch (err) {
    next(err)
  }
})

// DELETE a user
usersRouter.delete('/:id',
  [
    authJwt.verifyToken,
    authJwt.isAdmin
  ], async (req, res, next) => {
    
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.json(deletedUser.toJSON())

  } catch (err) {
    next(err)
  }
})


module.exports = usersRouter
