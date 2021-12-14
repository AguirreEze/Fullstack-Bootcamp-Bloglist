const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/Blog')
const { initialBlogs } = require('./helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('testing Get request on /api/blogs', () => {
  test('returns the correct info type', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct ammount of blogs', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
  })

  test('returned element have correct id', async () => {
    const res = await api.get('/api/blogs')
    res.body.map(elem => expect(elem.id).toBeDefined)
  })
})

describe('Testing Post request on /api/blogs', () => {
  test('Post request adds a blog', async () => {
    const newPost = {
      title: 'Testing some Posts',
      author: 'Ezequiel',
      url: 'https://testing.test.com/',
      likes: 3
    }
    await api.post('/api/blogs', newPost)
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length + 1)
  })

  test('Post request with missing likes properties will default to 0', async () => {
    const newPost = {
      title: 'Testing some Posts',
      author: 'Ezequiel',
      url: 'https://testing.test.com/'
    }
    const res = await api.post('/api/blogs', newPost)
    expect(res.body.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
