const User = require('../../models/user')

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

const checkRequiredUserPropertiesDefined = (req, res, next) => {
  try {
    console.log('checkReqProps')
    return next()

  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkAuthenticatedRoleOnDeleteOrUpdate,
  checkRequiredUserPropertiesDefined
}
