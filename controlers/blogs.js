const blogRouter = require('express').Router()

const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', (request, response, next) => {
  Blog
    .find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1
    })
    .then(blogs => {
      response.json(blogs).end()
    })
    .catch(err => next(err))
})

blogRouter.post('/', async (request, response, next) => {
  const {
    title,
    author,
    url,
    likes = 0,
    user
  } = request.body
  const userData = await User.findById(user)

  const newBlog = {
    title,
    author,
    url,
    likes,
    user: userData._id
  }
  const blog = new Blog(newBlog)
  try {
    const savedBlog = await blog.save()

    userData.blogs = userData.blogs.concat(savedBlog._id)
    await userData.save()

    response.status(201).json(savedBlog).end()
  } catch (err) { next(err) }
})

blogRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Blog.findByIdAndDelete(id)
    .then(blog => {
      if (blog === null) return res.json({ error: 'blog not found' }).status(400).end()
      return res.json(blog).status(200).end()
    })
    .catch(err => next(err))
})

blogRouter.put('/:id', (req, res, next) => {
  const { id } = req.params

  const newBlogInfo = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }

  Blog.findByIdAndUpdate(id, newBlogInfo, { new: true })
    .then(updated => res.json(updated).status(200).end)
    .catch(err => next(err))
})

// const getAllBlogs = (request, response, next) => {
//   Blog
//     .find({}).populate('user', {
//       username: 1,
//       name: 1,
//       id: 1
//     })
//     .then(blogs => {
//       response.json(blogs).end()
//     })
//     .catch(err => next(err))
// }

// const addNewBlog = async (request, response, next) => {
//   const {
//     title,
//     author,
//     url,
//     likes = 0,
//     user
//   } = request.body
//   const userData = await User.findById(user)

//   const newBlog = {
//     title,
//     author,
//     url,
//     likes,
//     user: userData._id
//   }
//   const blog = new Blog(newBlog)
//   try {
//     const savedBlog = await blog.save()

//     userData.blogs = userData.blogs.concat(savedBlog._id)
//     await userData.save()

//     response.status(201).json(savedBlog).end()
//   } catch (err) { next(err) }
// }

// const deleteByID = (req, res, next) => {
//   const { id } = req.params

//   Blog.findByIdAndDelete(id)
//     .then(blog => {
//       if (blog === null) return res.json({ error: 'blog not found' }).status(400).end()
//       return res.json(blog).status(200).end()
//     })
//     .catch(err => next(err))
// }

// const updateByID = (req, res, next) => {
//   const { id } = req.params

//   const newBlogInfo = {
//     title: req.body.title,
//     author: req.body.author,
//     url: req.body.url,
//     likes: req.body.likes
//   }

//   Blog.findByIdAndUpdate(id, newBlogInfo, { new: true })
//     .then(updated => res.json(updated).status(200).end)
//     .catch(err => next(err))
// }
module.exports = blogRouter
