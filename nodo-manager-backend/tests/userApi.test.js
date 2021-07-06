const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Role = require('../models/role')
const User = require('../models/user')
const config = require('../utils/config')
const rolesInitializer = require('../utils/rolesInitializer')

const api = supertest(app)

let adminToken
let managerToken
let employeeToken
let userToken


// Initialize roles database
beforeAll(async () => {
  await rolesInitializer()
})

// Reset collections before each test
beforeEach(async () => {
  // users
  await User.deleteMany({})

  // admin
  const newAdmin = new User({
    email: 'new@admin',
    username: 'TestAdmin',
    role: await Role.findOne({ name: 'admin' })
  })
  await newAdmin.save()
  adminToken = jwt.sign({ id: newAdmin.id }, config.JWT_PHRASE)

  // manager
  const newManager = new User({
    email: 'new@manager',
    username: 'TestManager',
    role: await Role.findOne({ name: 'manager' })
  })
  await newManager.save()
  managerToken = jwt.sign({ id: newManager.id }, config.JWT_PHRASE)

  // employee
  const newEmployee = new User({
    email: 'new@employee',
    username: 'TestEmployee',
    role: await Role.findOne({ name: 'employee' })
  })
  await newEmployee.save()
  employeeToken = jwt.sign({ id: newEmployee.id }, config.JWT_PHRASE)

  // user
  const newUser = new User({
    email: 'new@user',
    username: 'TestUser',
    role: await Role.findOne({ name: 'user' })
  })
  await newUser.save()
  userToken = jwt.sign({ id: newUser.id }, config.JWT_PHRASE)
})

//
describe('User API Tests', () => {

  //
  describe.only('Test Database Initializations', () => {
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
      test('Status 201 for correctly self-registering user', async () => {

        const createdUser = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password'
        }

        const res = await api
          .post('/api/users/signup')
          .send(createdUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        expect(res.body.role.name).toBe('user')
      })

      //
      test('Status 400 for request with empty/missing email', async () => {

        const noEmailUser = {
          name: 'New Test User',
          username: 'Tester 123',
          password: 'password'
        }

        const emptyEmailUser = {
          name: 'New Test User',
          username: 'Tester 123',
          email: '',
          password: 'password'
        }

        await api
          .post('/api/users/signup')
          .send(noEmailUser)
          .expect(400)

        await api
          .post('/api/users/signup')
          .send(emptyEmailUser)
          .expect(400)
      })

      //
      test('Status 400 for request with empty/missing username', async () => {

        const noUsernameUser = {
          name: 'New Test User',
          email: 'new@test.com',
          password: 'password'
        }

        const emptyUsernameUser = {
          name: 'New Test User',
          username: '',
          email: 'new@test.com',
          password: 'password'
        }

        await api
          .post('/api/users/signup')
          .send(noUsernameUser)
          .expect(400)

        await api
          .post('/api/users/signup')
          .send(emptyUsernameUser)
          .expect(400)
      })


      //
      test('Status 400 for request with duplicate email', async () => {
        const originalUser = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password'
        }

        const newUser = {
          name: 'Newer Tester Userer',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password'
        }

        await api
          .post('/api/users/signup')
          .send(originalUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .send(newUser)
          .expect(400)
      })

      //
      test('Status 400 for request with duplicate username', async () => {
        const originalUser = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password'
        }

        const newUser = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'newer@test.com',
          password: 'password'
        }

        await api
          .post('/api/users/signup')
          .send(originalUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .send(newUser)
          .expect(400)
      })

      //
      test('A jwt is required to assign additional roles to a new account',
        async () => {

        const createdUser = {
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
          .send(createdUser) //no jsonwebtoken
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', '') //jsonwebtoken is malformated
          .send(createdUser)
          .expect(401)
          .expect('Content-Type', /application\/json/)
      })

      //
      test('A new admin can only be created by admin', async () => {

        const newAdmin = {
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
          .set('x-access-token', userToken)
          .send(newAdmin)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', employeeToken)
          .send(newAdmin)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', managerToken)
          .send(newAdmin)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', adminToken)
          .send(newAdmin)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      })

      //
      test('A new manager can only be created by admin or manager',
      async () => {

        const newManager = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password',
          role: {
            name: 'manager'
          }
        }

        await api
          .post('/api/users/signup')
          .set('x-access-token', userToken)
          .send(newManager)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', employeeToken)
          .send(newManager)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', managerToken)
          .send(newManager)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        await User.findOneAndDelete({ username: 'Tester 123' })

        await api
          .post('/api/users/signup')
          .set('x-access-token', adminToken)
          .send(newManager)
          .expect(201)
          .expect('Content-Type', /application\/json/)

      })

      //
      test('A new employee can only be created by admin/manager/employee',
      async () => {

        const newEmployee = {
          name: 'New Test User',
          username: 'Tester 123',
          email: 'new@test.com',
          password: 'password',
          role: {
            name: 'employee'
          }
        }

        await api
          .post('/api/users/signup')
          .set('x-access-token', userToken)
          .send(newEmployee)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        await api
          .post('/api/users/signup')
          .set('x-access-token', employeeToken)
          .send(newEmployee)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        await User.findOneAndDelete({ username: 'Tester 123' })

        await api
          .post('/api/users/signup')
          .set('x-access-token', managerToken)
          .send(newEmployee)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        await User.findOneAndDelete({ username: 'Tester 123' })

        await api
          .post('/api/users/signup')
          .set('x-access-token', adminToken)
          .send(newEmployee)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      })
    })

    //
    describe('GET Requests', () => {
      //
      test('Status 403 for attempt with no token', async () => {
        await api
          .get('/api/users')
          .expect(403)
      })

      //
      test('Status 401 for attempt with user token', async () => {
        await api
          .get('/api/users')
          .set('x-access-token', userToken)
          .expect(401)
      })

      //
      test('Status 200 by providing valid employee+', async () => {

        const passingTokens = [adminToken, managerToken, employeeToken]

        for (const token of passingTokens) {
          await api
            .get('/api/users/')
            .set('x-access-token', token)
            .expect(200)
        }
      })

    })

    //
    describe('PUT Requests', () => {
      //

    })

    //
    describe.only('DELETE Requests', () => {
      //
      beforeEach(async () => {
        const adminToDelete = new User({
          name: 'Delete Me',
          username: 'Delete this ADMIN',
          email: 'delete@admin.com',
          password: 'password',
          role: await Role.findOne({ name: 'admin' })
        })
        await adminToDelete.save()

        const managerToDelete = new User({
          name: 'Delete Me',
          username: 'Delete this MANAGER',
          email: 'delete@manager.com',
          password: 'password',
          role: await Role.findOne({ name: 'manager' })
        })
        await managerToDelete.save()

        const employeeToDelete = new User({
          name: 'Delete Me',
          username: 'Delete this EMPLOYEE',
          email: 'delete@employee.com',
          password: 'password',
          role: await Role.findOne({ name: 'employee' })
        })
        await employeeToDelete.save()

        const userToDelete = new User({
          name: 'Delete Me',
          username: 'Delete this USER',
          email: 'delete@user.com',
          password: 'password',
          role: await Role.findOne({ name: 'user' })
        })
        await userToDelete.save()

        const guestToDelete = new User({
          name: 'Delete Me',
          username: 'Delete this GUEST',
          email: 'delete@guest.com',
          password: 'password',
          role: await Role.findOne({ name: 'guest' })
        })
        await guestToDelete.save()
      })

      //
      test('Status 403 without providing any token', async () => {
        await api
          .delete('/api/users/' + 'someRandomId')
          .expect(403)
      })

      //
      test('Status 404 with non-existing userId to delete', async () => {
        await api
          .delete('/api/users/' + '')
          .set('x-access-token', adminToken)
          .expect(404)
      })

      //
      describe('Admin users can delete all non-admin roles', () => {
        //
        test('Status 401 attempting to delete another admin', async () => {

          // Find admin created in beforeEach
          const delAdmin = await User.findOne({ username: 'Delete this ADMIN' })

          // Delete user by id
          await api
            .delete('/api/users/' + delAdmin._id)
            .set('x-access-token', adminToken)
            .expect(401)

          // Check existance
          const users = await api
            .get('/api/users')
            .set('x-access-token', adminToken)
            .expect(200)

          // An object containing a property username of 'Delete this admin'
          // shouldn't exist
          expect(users.body).not.toContain(
            expect.objectContaining(delAdmin.username)
          )
        })

        //
        test('Status 200 on attempt to delete a manager', async () => {
          // Find manager created in beforeEach
          const delManager = await User
            .findOne({ username: 'Delete this MANAGER' })

          // Delete user by id
          await api
            .delete('/api/users/' + delManager._id)
            .set('x-access-token', adminToken)
            .expect(200)

          // Check existance
          const users = await api
            .get('/api/users')
            .set('x-access-token', adminToken)
            .expect(200)

          // An oject with same username as deleted username shouldn't exist
          expect(users.body).not.toContain(
            expect.objectContaining(delManager.username)
          )
        })

        //
        test('Status 200 on attempt to delete an employee', async () => {
          // Find employee created in beforeEach
          const delEmployee = await User
            .findOne({ username: 'Delete this EMPLOYEE' })

          // Delete user by id
          await api
            .delete('/api/users/' + delEmployee._id)
            .set('x-access-token', adminToken)
            .expect(200)

          // Check existance
          const users = await api
            .get('/api/users')
            .set('x-access-token', adminToken)
            .expect(200)

          // An oject with same username as deleted username shouldn't exist
          expect(users.body).not.toContain(
            expect.objectContaining(delEmployee.username)
          )
        })

        //
        test('Status 200 on attempt to delete a user', async () => {
          // Find employee created in beforeEach
          const delUser = await User
            .findOne({ username: 'Delete this USER' })

          // Delete user by id
          await api
            .delete('/api/users/' + delUser._id)
            .set('x-access-token', adminToken)
            .expect(200)

          // Check existance
          const users = await api
            .get('/api/users')
            .set('x-access-token', adminToken)
            .expect(200)

          // An oject with same username as deleted username shouldn't exist
          expect(users.body).not.toContain(
            expect.objectContaining(delUser.username)
          )
        })

        //
        test('Status 200 on attempt to delete a guest', async () => {
          // Find employee created in beforeEach
          const delGuest = await User
            .findOne({ username: 'Delete this GUEST' })

          // Delete user by id
          await api
            .delete('/api/users/' + delGuest._id)
            .set('x-access-token', adminToken)
            .expect(200)

          // Check existance
          const users = await api
            .get('/api/users')
            .set('x-access-token', adminToken)
            .expect(200)

          // An oject with same username as deleted username shouldn't exist
          expect(users.body).not.toContain(
            expect.objectContaining(delGuest.username)
          )
        })



      })
    })
  })
})

// Close database connection
afterAll( async () => {
  await mongoose.connection.close()
})
