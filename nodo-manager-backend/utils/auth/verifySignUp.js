const Role = require('../../models/role')
const User = require('../../models/user')


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  if (await User.findOne({ username: req.body.username })) {
    res.status(400).send({ message: 'Username is already in use!' })
    return
  }

  // Email
  if (await User.findOne({ email: req.body.email })) {
    res.status(400).send({ message: 'Email is already in use!' })
    return
  }
  next()
}

const checkRolesExisted = async (req, res, next) => {
  if (req.body.role) {
    // Get list of all possible roles from db
    const possibleRoles = await Role.find({})
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
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp
