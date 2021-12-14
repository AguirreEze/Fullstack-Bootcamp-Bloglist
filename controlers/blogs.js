const Blog = require('../models/Blog')

const getAllBlogs = (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs).end()
    })
    .catch(err => next(err))
}

const addNewBlog = (request, response, next) => {
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0

  }
  const blog = new Blog(newBlog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result).end()
    })
    .catch(err => next(err))
}

module.exports = { getAllBlogs, addNewBlog }
