require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const blogControlers = require('./controlers/blogs')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', blogControlers.getAllBlogs)

app.post('/api/blogs', blogControlers.addNewBlog)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
