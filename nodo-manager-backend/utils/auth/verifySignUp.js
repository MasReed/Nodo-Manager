const jwt = require('jsonwebtoken')
const config = require('../config')

const Role = require('../../models/role')
const User = require('../../models/user')


const checkUsernameOrEmailExists = async (req, res, next) => {
  try {
    // Username
    if (!req.body.username || req.body.username === '') {
      throw { status: 400, message: 'A username is required.' }
    }

    // Email
    if (!req.body.email || req.body.email === '') {
      throw { status: 400, message: 'An email is required.'}
    }

    return next()
  } catch (err) {
    next(err)
  }
}


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    if ( await User.findOne({ username: req.body.username }).exec() ) {
      throw { status: 400, message: 'Username is already in use!' }
    }

    // Email
    if ( await User.findOne({ email: req.body.email }).exec() ) {
      throw { status: 400, message: 'Email is already in use! '}
    }

    return next()

  } catch (err) {
    next(err)
  }
}

const checkRolesExisted = async (req, res, next) => {
  try {
    if (req.body.role) {
      // Get list of all possible roles from db
      const possibleRoles = await Role.find({}).exec()
      const possibleRoleNames = possibleRoles.map(obj => obj.name)

      // Any roles not included in db cause 400 Bad Request
      if (!possibleRoleNames.includes(req.body.role.name)) {
        res.status(400).send({
          message: `Failed: Role ${req.body.role} does not exist`
        })
        return
      }
    }
    return next()

  } catch (err) {
    next(err)
  }
}

const checkAuthenticatedRoleCreator = async (req, res, next) => {
  try {
    // Only verify token if request is trying to apply a role to user
    if (req.body.role) {
      const token = req.headers['x-access-token']

      if (!token) {
        throw ({ status: 401, message: 'No token provided' })
      }

      // verify new user creators' token
      const userDecoded = await jwt.verify(token, config.JWT_PHRASE)

      const reqUser = await User
        .findById(userDecoded.id)
        .populate('role', '-__v')
        .exec()

      // The creating user must have the same or higher level role than new user
      if (reqUser.role.encompassedRoles.includes(req.body.role.name)) {
        return next()
      }

      // "Administrative scope" error occurs if not
      throw ({ status: 401, message: `Requires ${req.body.role.name} role.`})

    }
    return next()

  } catch (err) {
    next(err)
  }
}

const verifySignUp = {
  checkUsernameOrEmailExists,
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkAuthenticatedRoleCreator
}

module.exports = verifySignUp
