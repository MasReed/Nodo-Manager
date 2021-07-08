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

  })
})

// Close database connection
afterAll( async () => {
  await mongoose.connection.close()
})
