const Role = require('../../models/role')
const User = require('../../models/user')


const checkUsernameOrEmailExists = async (req, res, next) => {
  try {
    // Username
    if (!req.body.username) {
      throw { status: 400, message: 'A username is required.' }
    }

    // Email
    if (!req.body.email) {
      throw { status: 400, message: 'An email is required.'}
    }

    next()
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

    next()

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
    next()

  } catch (err) {
    next(err)
  }
}

const verifySignUp = {
  checkUsernameOrEmailExists,
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp
