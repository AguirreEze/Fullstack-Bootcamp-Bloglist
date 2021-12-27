require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controlers/blogs')
const userRouter = require('./controlers/users')
const loginRouter = require('./controlers/login')
const middlewares = require('./utils/middlewares')

app.use(cors())
app.use(express.json())

app.use(middlewares.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controlers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middlewares.errorHandler)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
