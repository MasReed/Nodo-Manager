const usersRouter = require('express').Router()
const User = require('../models/user')
const Role = require('../models/role')
const authJwt = require('../utils/auth/authJWT')
const verifySignUp = require('../utils/auth/verifySignUp')



// CREATE new user
usersRouter.post('/', verifySignUp.checkRolesExisted, async (req, res) => {
  const body = req.body

  const newUser = new User({
    name: body.name,
    username: body.username,
    passwordHash: body.password,
    roles: body.rolesArray
  })

  if (body.roles.length > 0) {
    Role.find(
      {
        name: { $in: body.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }

      newUser.roles = roles
    })
  } else {
    Role.findOne({ name: 'user' }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      newUser.roles = role
    })
  }

  const savedUser = await newUser.save()
  res.json(savedUser.toJSON())
})

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
