const config = require('../config')
const Role = require('../../models/role')
const User = require('../../models/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const signup = async (req, res) => {

  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  })

  try {
    if (req.body.roles.length > 0) {
      const queriedRoles = await Role.find({ name: { $in: req.body.roles} })
      newUser.roles = queriedRoles.map(role => role)
      const savedUser = await newUser.save()
      res.status(201).json(savedUser.toJSON())

    } else {
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

const signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.passwordHash
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password'
        })
      }

      let token = jwt.sign({ id: user.id }, config.JWT_PHRASE, {
        expiresIn: 86400 // 24 hours
      })

      let authorities = []

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      })
    })
}

const authSigns = {
  signup,
  signin
}

module.exports = authSigns
