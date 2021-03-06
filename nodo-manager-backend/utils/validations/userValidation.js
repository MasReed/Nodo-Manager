const User = require('../../models/user')
const bcrypt = require('bcryptjs')

//
const checkAuthenticatedRoleOnDeleteOrUpdate = async (req, res, next) => {
  // Updating user with role = key requires role of that key's value
  // i.e. updating a manager requires an admin
  const authRoleMap = {
    admin: 'superadmin',
    manager: 'admin',
    employee: 'manager',
    user: 'manager',
    guest: 'manager'
  }

  try {
    const delUser = await User
      .findById(req.params.id)
      .populate('role', '-__v')
      .exec()

    const reqUser = await User
      .findById(req.userId)
      .populate('role', '-__v')
      .exec()

    // The updating/deleting user must have a higher level role than user to mod
    if (reqUser.role.encompassedRoles.includes(authRoleMap[delUser.role.name])) {
      return next()
    }

    // "Administrative scope" error occurs if not
    throw ({
      status: 401,
      message: `Requires ${authRoleMap[delUser.role.name]} role.`
    })

  } catch (err) {
    next(err)
  }
}

//
const hashPasswordOnUpdate = async (req, res, next) => {
  try {
    const requestedUserToUpdate = await User.findById(req.body.id)

    if (req.body.password === null) {
      req.body.password = requestedUserToUpdate.passwordHash

    } else if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    return next()

  } catch (err) {
    next(err)
  }
}

//
const checkRequiredUserPropertiesDefined = (req, res, next) => {
  try {
    // These match menuItemSchema 'required' properties, see models/menuItems
    const requiredPropertiesAndErrorMessage = {
      email: 'An email address is required.',
      username: 'A username is required.',
      password: 'A password is required.',
      role: 'A role is required.'
    }

    for (const property in requiredPropertiesAndErrorMessage) {
      if (!req.body[property] || req.body[property] === '') {
        throw {
          status: 400,
          message: requiredPropertiesAndErrorMessage[property]
        }
      }
    }

    return next()

  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkAuthenticatedRoleOnDeleteOrUpdate,
  hashPasswordOnUpdate,
  checkRequiredUserPropertiesDefined
}
