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
    // console.log('authJWT verify token: ', err)
    next(err)
  }
}

// Check if user has admin authorizations
const isAdmin = async (req, res, next) => {
  try {
    const user = await User
      .findById(req.userId)
      .populate('role', '-__v')
      .exec()

    if (user.role.encompassedRoles.includes('admin')) {
      return next()
    }

    throw ({ status: 401, message: 'Requires Admin Role' })

  } catch (err) {
    next(err)
  }
}

// Check if user has manager authorizations
const isManager = async (req, res, next) => {
  try {
    const user = await User
      .findById(req.userId)
      .populate('role', '-__v')
      .exec()

    if (user.role.encompassedRoles.includes('manager')) {
      return next()
    }

    throw ({ status: 401, message: 'Requires Manager Role' })

  } catch (err) {
    next(err)
  }
}


// Check if user has employee authorizations
const isEmployee = async (req, res, next) => {
  try {
    const user = await User
      .findById(req.userId)
      .populate('role', '-__v')
      .exec()

    if (user.role.encompassedRoles.includes('employee')) {
      return next()
    }

    throw ({ status: 401, message: 'Requires Employee Role' })

  } catch (err) {
    next(err)
  }
}

// Check if user has user authorizations
const isUser = async (req, res, next) => {
  try {
    const user = await User
      .findById(req.userId)
      .populate('role', '-__v')
      .exec()

    if (user.role.encompassedRoles.includes('user')) {
      return next()
    }

    throw ({ status: 401, message: 'Requires User Role' })

  } catch (err) {
    next(err)
  }
}

const authJwt = {
  verifyToken,
  isAdmin,
  isManager,
  isEmployee,
  isUser
}

module.exports = authJwt
