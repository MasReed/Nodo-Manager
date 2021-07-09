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
      describe('Data Validations', () => {
        //
        test('Status 200 given proper format', async () => {

          await api
            .post('/api/orders')
            .set('x-access-token', adminToken)
            .send(validOrder)
            .expect(200)
        })

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
      describe('Data Validations', () => {

      })

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