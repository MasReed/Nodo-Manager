const jwt = require('jsonwebtoken')
const config = require('../config')
const Role = require('../../models/role')
const User = require('../../models/user')

// Used to verify accessToken supplied by user during requests
const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({ message: 'No token provided' })
  }

  jwt.verify(token, config.JWT_PHRASE, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    req.userId = decoded.id
    next()
  })
}

// Check if user has admin authorizations
const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'admin') {
            next();
            return;
          }
        }

        res.status(403).send({ message: 'Require Admin Role' })
      }
    )
  })
}

// Check if user has manager authorizations
const isManager = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err })
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'manager') {
            next()
            return
          }
        }

        res.status(403).send({ message: 'Require Manager Role' })
        return
      }
    )
  })
}

const authJwt = {
  verifyToken,
  isAdmin,
  isManager
}

module.exports = authJwt
