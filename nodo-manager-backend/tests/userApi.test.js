const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const rolesInitializer = require('../utils/rolesInitializer')

const Role = require('../models/role')
const User = require('../models/user')

const api = supertest(app)


// Initialize roles database
beforeAll(() => {
  rolesInitializer()
  return
})

// Reset collections before each test
beforeEach(async () => {
  // users
  await User.deleteMany({})
})

//
describe('User API Tests', () => {

  //
  describe('Test Database Initializations', () => {
    //
    test('roles are initialized', async () => {
      const roles = await Role.find({}).exec()
      expect(roles).toHaveLength(5)
    })
  })

  //
  describe('User CRUD Operations', () => {

    //
    describe('POST Requests', () => {
      //

    })

    //
    describe('GET Requests', () => {
      //

    })

    //
    describe('PUT Requests', () => {
      //

    })

    //
    describe('DELETE Requests', () => {
      //

    })
  })
})

// Close database connection
afterAll( async () => {
  await mongoose.connection.close()
})
