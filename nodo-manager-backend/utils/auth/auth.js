const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')
const Role = require('../../models/role')
const User = require('../../models/user')

// Authenticate new user when self-registerd or created by an authorized user
const signup = async (req, res, next) => {

  // Note: bcrypt.hash is async
  const newUser = await new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    passwordHash: await bcrypt.hash(req.body.password, 10),
    orders: null
  })

  if (req.body.role) {
    /* Check name of role given to user at registration and set newUser role
    as correct role object from database */
    try {
      newUser.role = await Role.findOne({ name: { $in: req.body.role.name } })
      const savedUser = await newUser.save()
      res.status(201).json(savedUser.toJSON())
      return next()

    } catch (err) {
      next(err)
    }

  } else {
    // Otherwise set default role to 'user'
    try {
      const userRole = await Role.findOne({ name: 'user' })
      newUser.role = userRole
      const savedUser = await newUser.save()
      res.status(201).json(savedUser.toJSON())
      return next()

    } catch (err) {
      next(err)
    }
  }
}

// Authenticate user login credentials
const signin = async (req, res, next) => {
  try {

    // Username not supplied throws 400 Bad Request
    if (!req.body.username) {
      throw { status: 400, message: 'Enter a user.'}
    }

    // Password not supplied throws 400 Bad Request
    if (!req.body.password) {
      throw { status: 400, message: 'Enter a password.'}
    }

    // Query db for user with existing username
    const user = await User
      .findOne({ username: req.body.username })
      .populate('role', '-__v')
      .populate('orders')

    // User not found throws 404 Not Found
    if (!user) {
      throw { status: 404, message: 'User not found.' }
    }

    // Compare entered/stored credentials.
    // Note: bcrypt.compare is async.
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    )

    // Invalid Password throws 401 Unauthorized
    if (!passwordIsValid) {
      throw { status: 401, message: 'Invalid Password.' }

    } else {
      // User exists and credentials are valid, then create jsonwebtoken
      const token = jwt.sign({ id: user.id }, config.JWT_PHRASE, {
        expiresIn: 86400 // 24 hours
      })

      // Return user payload with accessToken and authorized roles
      res.status(200).send({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        orders: user.orders,
        accessToken: token
      })
    }
    return next()

  } catch (err) {
    next(err)
  }
}

const authSigns = {
  signup,
  signin
}

module.exports = authSigns
