const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Item = require('../models/menuItem')
const Role = require('../models/role')
const Order = require('../models/order')
const User = require('../models/user')
const config = require('../utils/config')
const rolesInitializer = require('../utils/rolesInitializer')

const api = supertest(app)

let adminToken
let managerToken
let employeeToken
let userToken
let guestToken

let validOrder

// Initialize roles and users in database
beforeAll(async () => {
  // Roles
  await rolesInitializer()

  // Users
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

  // guest
  const newGuest = new User({
    email: 'new@guest',
    username: 'TestGuest',
    role: await Role.findOne({ name: 'guest' })
  })
  await newGuest.save()
  guestToken = jwt.sign({ id: newGuest.id }, config.JWT_PHRASE)

  // Items
  await Item.deleteMany({})

  const item1 = new Item({
    name: 'Test Item 1',
    description: 'A simple food item for testing orders.',
    ingredients: ['A', 'B', 'C', 'D', 'E', 'F'],
    category: 'Test Foods',
    price: 1.99,
    availability: 'Available'
  })
  await item1.save()

  const item2 = new Item({
    name: 'Test Item 2',
    description: 'Another simple food item for testing orders.',
    ingredients: ['F', 'E', 'D', 'C', 'B', 'A'],
    category: 'Test Foods',
    price: 4.99,
    availability: 'Available'
  })
  await item2.save()

  const items = await Item.find({})
  validOrder = {
    status: 'In progress',
    category: 'Carry Out',
    name: 'Test Order',
    items: [
      {...items[0], basePrice: 1.99}, // Shortcut of proper format until
      {...items[1], basePrice: 4.99} // moded object in order is uniform
    ],
    notes: 'This is a test.',
    subTotal: 6.98,
    taxRate: 0.07,
    taxAmount: 0.49,
    total: 7.47
  }
})

// Reset collections before each test
beforeEach(async () => {
  await Order.deleteMany({})
})

//
describe('Order API Tests', () => {
  //
  describe('Test Database Initializations', () => {
    //
    test('roles are initialized', async () => {
      const roles = await Role.find({}).exec()
      expect(roles).toHaveLength(5)
    })

    //
    test('users are initialized', async () => {
      const users = await User.find({}).exec()
      expect(users).toHaveLength(5)
    })

    //
    test('items are initialized', async () => {
      const items = await Item.find({}).exec()
      expect(items).toHaveLength(2)
    })
  })

  //
  describe('User CRUD Operations', () => {
    //
    describe('POST Requests', () => {
      //
      describe.only('Data Validations', () => {
        //
        test('Status 200 given proper format', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 400 if no items are in order', async () => {
          const invalidOrder = {
            ...validOrder,
            items: []
          }

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(invalidOrder)
            .expect(400)

          expect(res.body.message).toBe('No items in order!')
        })

        //
        test('Undefined order time defaults to ~ current time', async () => {
          // Approximate time due to asynchronicity of funcs
          const validOrderWithoutTime = {
            ...validOrder,
            time: undefined
          }

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrderWithoutTime)
            .expect(200)

          const resTime = new Date(res.body.time).getTime()
          const nowTime = new Date().getTime()
          const deltaT = Math.abs( resTime - nowTime )

          expect(res.body.time).toBeDefined()
          expect(deltaT < 300).toBe(true) // Order time within 5min/300s of now
        })

        //
        describe('Status Property', () => {
          //
          test('Undefined order status defaults to "In Progress"', async () => {
            const validOrderWithoutStatus = {
              ...validOrder,
              status: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithoutStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })

          //
          test('Empty order status defaults to "In Progress"', async () => {
            const validOrderWithEmptyStatus = {
              ...validOrder,
              status: ''
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })

          //
          test('Invalid order status defaults to "In Progress"', async () => {
            const validOrderWithInvalidStatus = {
              ...validOrder,
              status: 'INVALID STATUS'
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithInvalidStatus)
              .expect(200)

            expect(res.body.status).toBe('In Progress')
          })
        })

        //
        describe('Category Property', () => {
          //
          test('Undefined order category defaults to "Other"', async () => {
            const validOrderWithUndefinedCategory = {
              ...validOrder,
              category: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedCategory)
              .expect(200)

            expect(res.body.category).toBe('Other')
          })

          //
          test('Empty order category defaults to "Other"', async () => {
            const validOrderWithEmptyCategory = {
              ...validOrder,
              category: ''
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyCategory)
              .expect(200)

            expect(res.body.category).toBe('Other')
          })
        })

        //
        describe('Name Property', () => {
          //
          test('Status 400 for undefined order name', async () => {
            const validOrderWithUndefinedCategory = {
              ...validOrder,
              name: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedCategory)
              .expect(400)

            expect(res.body.message).toBe('An order name is required.')
          })

          //
          test('Status 400 for empty order name', async () => {
            const validOrderWithEmptyCategory = {
              ...validOrder,
              name: ''
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyCategory)
              .expect(400)

            expect(res.body.message).toBe('An order name is required.')
          })
        })

        //
        describe('Order Items Property', () => {
          //
          test('Status 400 for undefined order items', async () => {
            const validOrderWithUndefinedItems = {
              ...validOrder,
              items: undefined
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithUndefinedItems)
              .expect(400)

            expect(res.body.message).toBe('No items in order!')
          })

          //
          test('Status 400 for empty order items', async () => {
            const validOrderWithEmptyItems = {
              ...validOrder,
              items: []
            }

            const res = await api
              .post('/api/orders')
              .set('x-access-token', adminToken)
              .send(validOrderWithEmptyItems)
              .expect(400)

            expect(res.body.message).toBe('No items in order!')
          })
        })

        //
        describe('Order Notes Property', () => {

        })

        //
        describe('Order Cost-Related Properties', () => {

        })
      })

      //
      describe('Authorization Validations', () => {
        //
        test('Status 200 providing valid order and admin token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 200 providing valid order and manager token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', managerToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 200 providing valid order and employee token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', employeeToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 200 providing valid order and user token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', userToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 200 providing valid order and guest token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', guestToken)
            .send(validOrder)
            .expect(200)
        })

        //
        test('Status 401 providing valid order and invalid token', async () => {
          await api
            .post('/api/orders')
            .set('x-access-token', 'invalidToken')
            .send(validOrder)
            .expect(401)
        })

        //
        test('Status 403 providing valid order and no token', async () => {
          await api
            .post('/api/orders')
            .send(validOrder)
            .expect(403)
        })
      })
    })

    //
    describe('GET Requests', () => {
      //
      describe('Authorization Validations', () => {
        //
        test('Status 200 providing admin token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', adminToken)
            .expect(200)
        })

        //
        test('Status 200 providing manager token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', managerToken)
            .expect(200)
        })

        //
        test('Status 200 providing employeeToken token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', employeeToken)
            .expect(200)
        })

        //
        test('Status 401 providing user token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', userToken)
            .expect(401)
        })

        //
        test('Status 401 providing guest token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', guestToken)
            .expect(401)
        })

        //
        test('Status 401 providing an invalid token', async () => {
          await api
            .get('/api/orders')
            .set('x-access-token', 'invalidToken')
            .expect(401)
        })

        //
        test('Status 403 providing no token', async () => {
          await api
            .get('/api/orders')
            .expect(403)
        })
      })
    })

    //
    describe('PUT Requests', () => {
      //
      describe('Data Validations', () => {

      })

      //
      describe('Authorization Validations', () => {
        //
        test('Status 200 providing admin token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', adminToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(200)

          expect(res.body.name).toBe('Updated Test Order')
          expect(res.body.notes).toBe('This is a test.')
        })

        //
        test('Status 200 providing manager token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', managerToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(200)

          expect(res.body.name).toBe('Updated Test Order')
          expect(res.body.notes).toBe('This is a test.')
        })

        //
        test('Status 200 providing employeeToken token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', employeeToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(200)

          expect(res.body.name).toBe('Updated Test Order')
          expect(res.body.notes).toBe('This is a test.')
        })

        //
        test('Status 401 providing user token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', userToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(401)

          expect(res.body.message).toBe('Requires Employee Role')
        })

        //
        test('Status 401 providing guest token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', guestToken)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(401)

          expect(res.body.message).toBe('Requires Employee Role')
        })

        //
        test('Status 401 providing an invalid token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .set('x-access-token', 'invalidToken')
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(401)

          expect(res.body.message).toBe('jwt malformed')
        })

        //
        test('Status 403 providing no token', async () => {

          const created = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToUpdateId = created.body._id

          const res = await api
            .put('/api/orders/' + orderToUpdateId)
            .send({ ...validOrder, name: 'Updated Test Order' })
            .expect(403)

          expect(res.body.message).toBe('No token provided')
        })
      })
    })

    //
    describe('DELETE Requests', () => {
      //
      describe('Data Validations', () => {

        //
        test('Status 204 for null query results', async () => {
          // Mongoose findByIdAndUpdate returns null if no object with id is
          //found. Currently, no special error is thrown.
          await api
            .delete('/api/items/' + 'NotARealId12')
            .expect(204)
        })

        //
        test('Status 500 with incorrect id format', async () => {
          // Mongoose throws a CastError, caught in errorHandler
          await api
            .delete('/api/items/' + '000')
            .expect(500)
        })
      })

      //
      describe('Authorization Validations', () => {
        //
        test('Status 200 providing admin token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', adminToken)
            .expect(200)

          const orders = await Order.find({}).exec()
          expect(orders).toHaveLength(0)
        })

        //
        test('Status 200 providing manager token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', managerToken)
            .expect(200)

          const orders = await Order.find({}).exec()
          expect(orders).toHaveLength(0)
        })

        //
        test('Status 401 providing employeeToken token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', employeeToken)
            .expect(401)
        })

        //
        test('Status 401 providing user token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', userToken)
            .expect(401)
        })

        //
        test('Status 401 providing guest token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', guestToken)
            .expect(401)
        })

        //
        test('Status 401 providing an invalid token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .set('x-access-token', 'invalidToken')
            .expect(401)
        })

        //
        test('Status 403 providing no token', async () => {

          const res = await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)

          const orderToDeleteId = res.body._id

          await api
            .delete('/api/orders/' + orderToDeleteId)
            .expect(403)
        })
      })
    })
  })
})

// Close database connection
afterAll( async () => {
  await mongoose.connection.close()
})
