
function rolesInitializer() {

  const Role = require('../models/role');

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      // Guest
      new Role({
        name: 'guest',
        encompassedRoles: ['guest']
      }).save(err => {
        if (err) {
          console.log(err);
        }
        console.log("added 'guest' to roles collection");
      });

      // User
      new Role({
        name: 'user',
        encompassedRoles: ['user', 'guest']
      }).save(err => {
        if (err) {
          console.log(err);
        }
        console.log("added 'user' to roles collection");
      });

      // Employee
      new Role({
        name: 'employee',
        encompassedRoles: ['employee', 'user', 'guest']
      }).save(err => {
        if (err) {
          console.log(err)
        }
        console.log("added 'employee' to roles collection");
      })

      // Manager
      new Role({
        name: 'manager',
        encompassedRoles: ['manager', 'employee', 'user', 'guest']
      }).save(err => {
        if (err) {
          console.log(err);
        }
        console.log("added 'manager' to roles collection");
      });

      // Admin
      new Role({
        name: 'admin',
        encompassedRoles: ['admin', 'manager', 'employee', 'user', 'guest']
      }).save(err => {
        if (err) {
          console.log(err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = rolesInitializer
