const Role = require('../../models/role')
const User = require('../../models/user')


const checkDuplicateUsernameOrEmail = async (req, res, next) => {

  try {
    // Username
    if (await User.findOne({ username: req.body.username })) {
      throw { status: 400, message: 'Username is already in use!' }
    }

    // Email
    if (await User.findOne({ email: req.body.email })) {
      throw { status: 400, message: 'Email is already in use!' }
    }

  } catch (err) {
    next(err)
  }
}

const checkRolesExisted = async (req, res, next) => {
  if (req.body.role) {

    try {
      // Get list of all possible roles from db
      const possibleRoles = await Role.find({})
      const possibleRoleNames = possibleRoles.map(obj => obj.name)

      // Any roles not included in db throws 400 Bad Request
      if (!possibleRoleNames.includes(req.body.role.name)) {
        throw {
          status: 400,
          message: `Failed: Role ${req.body.role} does not exist.`
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp
