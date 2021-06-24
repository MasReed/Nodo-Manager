const authenticationsRouter = require('express').Router()
const authControl = require('../utils/auth/auth')

// Direct login
authenticationsRouter.post('/signin', authControl.signin)

module.exports = authenticationsRouter
