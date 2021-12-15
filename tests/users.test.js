const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
// const User = require('../models/User')
// const { initialUsers } = require('./helper')

const api = supertest(app)

describe('Testing User create', () => {
  test('Creating user with less than 3 characters should fail', async () => {
    const user = {
      username: 'Ty',
      password: 'ske130',
      name: 'ezequiel'
    }
    await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect({ error: 'User validation failed: username: username should be at least 3 characters long' })
  })

  test('Creating password with less than 3 characters should fail', async () => {
    const user = {
      username: 'Tydro',
      password: 's1',
      name: 'ezequiel'
    }
    await api.post('/api/users')
      .send(user)
      .expect(400)
      .expect({ error: 'password should be at least 3 characters long' })
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
