const mongoose = require('mongoose')

const db = {}

db.mongoose = mongoose

db.user = require('./user')
db.role = require('./role')

db.ROLES = ['guest', 'user', 'employee', 'manager', 'admin']

module.exports = db
