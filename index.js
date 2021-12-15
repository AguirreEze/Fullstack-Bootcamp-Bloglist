require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controlers/blogs')
const userControlers = require('./controlers/users')
const { errorHandler } = require('./utils/middlewares')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

// app.get('/api/blogs', blogControlers.getAllBlogs)
// app.post('/api/blogs', blogControlers.addNewBlog)
// app.delete('/api/blogs/:id', blogControlers.deleteByID)
// app.put('/api/blogs/:id', blogControlers.updateByID)

app.get('/api/users', userControlers.getAllUsers)
app.post('/api/users', userControlers.createUser)

app.use(errorHandler)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
