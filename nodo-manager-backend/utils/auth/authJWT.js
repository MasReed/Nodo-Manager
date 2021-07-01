const jwt = require('jsonwebtoken')
const config = require('../config')
const Role = require('../../models/role')
const User = require('../../models/user')

// Used to verify accessToken supplied by user during requests
const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token']

  try {
    if (!token) {
      throw ({ status: 403, message: 'No token provided' })
    }

    const decoded = await jwt.verify(token, config.JWT_PHRASE)
    req.userId = decoded.id
    return next()

  } catch (err) {
    console.log('authJWT verify token: ', err)
    next(err)
  }
}

// Check if user has admin authorizations
const isAdmin = async (req, res, next) => {

  try {
    const user = await User.findById(req.userId)
    const userRoles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < userRoles.length; i++) {
      if (userRoles[i].name === 'admin') {
        return next()
      }
    }
    throw ({ status: 403, message: 'Require Admin Role' })

  } catch (err) {
    next(err)
  }
}

// Check if user has manager authorizations
const isManager = async (req, res, next) => {

  try {
    const user = await User.findById(req.userId)
    const userRoles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
      if (userRoles[i].name === 'manager') {
        return next()
      }
    }
    throw ({ status: 403, message: 'Require Manager Role' })

  } catch (err) {
    next(err)
  }
}

const authJwt = {
  verifyToken,
  isAdmin,
  isManager
}

module.exports = authJwt
