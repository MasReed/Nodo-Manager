const authenticationsRouter = require('express').Router()

const verifySignUp = require('../utils/auth/verifySignUp')
const authControl = require('../utils/auth/auth')

const User = require('../models/user')

//
authenticationsRouter.post('/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  authControl.signup
)

//
authenticationsRouter.post('/signin', authControl.signin)


module.exports = authenticationsRouter
