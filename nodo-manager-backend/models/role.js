const mongoose = require('mongoose')


const roleSchema = new mongoose.Schema({
  name: String,
  encompassedRoles: Array
})

module.exports = mongoose.model('Role', roleSchema)
