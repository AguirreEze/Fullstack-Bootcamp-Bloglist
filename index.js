require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const blogControlers = require('./controlers/blogs')
const { errorHandler } = require('./utils/middlewares')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', blogControlers.getAllBlogs)
app.post('/api/blogs', blogControlers.addNewBlog)
app.delete('/api/blogs/:id', blogControlers.deleteByID)

app.use(errorHandler)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
