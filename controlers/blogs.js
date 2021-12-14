const Blog = require('../models/Blog')

const getAllBlogs = (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs).end()
    })
    .catch(console.log)
}

const addNewBlog = (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result).end()
    })
    .catch(console.log)
}

module.exports = { getAllBlogs, addNewBlog }
