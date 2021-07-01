const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Role = require('../models/role')
const User = require('../models/user')
const config = require('../utils/config')
const rolesInitializer = require('../utils/rolesInitializer')

const api = supertest(app)


// Initialize roles database
beforeAll(async () => {
  await rolesInitializer()
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
      test('A new account can self-register as user', async () => {

        const newUser = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password'
        }

        const res = await api
          .post('/api/users/signup')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        expect(res.body.role.name).toBe('user')
      })

      //
      test('A jwt is required to assign additional roles to a new account',
        async () => {

        const newUser = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password',
          role: {
            name: 'admin'
          }
        }

        await api
          .post('/api/users/signup')
          .send(newUser) //no jsonwebtoken
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', '') //jsonwebtoken is malformated
          .send(newUser)
          .expect(401)
          .expect('Content-Type', /application\/json/)
      })

      //
      test('A new account with admin role can only be created by admin',
        async () => {

        const newAdmin = new User({
          email: 'new@admin',
          username: 'TestAdmin',
          role: await Role.findOne({ name: 'admin' })
        })
        await newAdmin.save()

        const adminToken = jwt.sign({ id: newAdmin.id }, config.JWT_PHRASE)

        const newEmployee = new User({
          email: 'new@employee',
          username: 'TestEmployee',
          role: await Role.findOne({ name: 'employee' })
        })
        await newEmployee.save()
        const employeeToken = jwt.sign({ id: newEmployee.id }, config.JWT_PHRASE)


        const newUser = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password',
          role: {
            name: 'admin'
          }
        }

        await api
          .post('/api/users/signup')
          .set('x-access-token', employeeToken)
          .send(newUser)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', adminToken)
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      })
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
