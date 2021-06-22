const config = require('../config')
const Role = require('../../models/role')
const User = require('../../models/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Authenticate new user when self-registerd or created by an authorized user
const signup = async (req, res) => {

  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    passwordHash: await bcrypt.hash(req.body.password, 10),
    // Note: bcrypt.hash is async
  })

  try {
    if (req.body.roles.length > 0) {
      // Check additional roles given to user at registration
      const queriedRoles = await Role.find({ name: { $in: req.body.roles} })
      newUser.roles = queriedRoles.map(role => role)
      const savedUser = await newUser.save()
      res.status(201).json(savedUser.toJSON())
    } else {
      // Otherwise set default role to 'user'
      const userRole = await Role.findOne({ name: 'user' })
      newUser.roles = [userRole]
      const savedUser = await newUser.save()
      res.status(201).json(savedUser.toJSON())
    }
  } catch (exception) {
    console.log(exception)
    res.status(500).send({ message: exception })
  }
}

// Authenticate user credentials
const signin = async (req, res) => {
  try {
    // Query db for user with existing username
    const user = await User
      .findOne({ username: req.body.username })
      .populate('roles', '-__v')

    // Non-existant user results in 404 Not Found
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    // Compare entered pw and stored pw hash. Note: bcrypt.compare is async.
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    )

    // Invalid Password results in 401 Unauthorized
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password'
      })
    }

    // User exists and entered correct pw, create jsonwebtoken
    const token = jwt.sign({ id: user.id }, config.JWT_PHRASE, {
      expiresIn: 86400 // 24 hours
    })

    // Authorized roles associated with token
    const authorities = user.roles.map(role =>
      'ROLE_' + role.name.toUpperCase()
    )

    // Return user payload with accessToken and authorized roles
    res.status(200).send({
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    })

  } catch (exception) {
    console.log(exception)
    res.status(500).send({ message: exception })
  }
}

const authSigns = {
  signup,
  signin
}

module.exports = authSigns
