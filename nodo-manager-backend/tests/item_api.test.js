const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const rolesInitializer = require('../utils/rolesInitializer')
const Role = require('../models/role')

const api = supertest(app)

beforeAll(() => {
  return rolesInitializer()
})

test('roles are initialized', async () => {
  const roles = await Role.find({}).exec()
  expect(roles).toHaveLength(5)
})

test('items are returned as json', async () => {
  await api
    .get('/api/items')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



afterAll( async () => {
  await mongoose.connection.close()
})
