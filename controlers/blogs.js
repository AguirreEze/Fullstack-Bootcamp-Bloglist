const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')

const getToken = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1
    })
    response.json(blogs).end()
  } catch (err) { next(err) }
})

blogRouter.post('/', async (request, response, next) => {
  const {
    title,
    author,
    url,
    likes = 0
  } = request.body

  const token = getToken(request)

  let decodedToken = {}
  decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })

  const { id } = decodedToken

  const userData = await User.findById(id)

  const newBlog = {
    title,
    author,
    url,
    likes,
    user: userData.id
  }
  const blog = new Blog(newBlog)
  try {
    const savedBlog = await blog.save()

    userData.blogs = userData.blogs.concat(savedBlog.id)
    await userData.save()

    response.status(201).json(savedBlog).end()
  } catch (err) { next(err) }
})

blogRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const blog = await Blog.findByIdAndDelete(id)

    if (blog === null) return res.json({ error: 'blog not found' }).status(400).end()
    return res.json(blog).status(200).end()
  } catch (err) { next(err) }
})

blogRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params

  const newBlogInfo = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }

  try {
    const updated = await Blog.findByIdAndUpdate(id, newBlogInfo, { new: true })
    res.json(updated).status(200).end()
  } catch (err) { next(err) }
})

module.exports = blogRouter
