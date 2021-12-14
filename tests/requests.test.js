const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')

const api = supertest(app)

test('request to /api/blogs returns the correct info', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
