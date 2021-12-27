const testingRouter = require('express').Router()
const User = require('../models/User')
const Blogs = require('../models/Blog')

testingRouter.post('/reset', async (req, res, next) => {
  try {
    await User.deleteMany({})
    await Blogs.deleteMany({})
  } catch (err) { return next(err) }

  res.status(204).end()
})

module.exports = testingRouter
