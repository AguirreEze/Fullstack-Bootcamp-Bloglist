const userRouter = require('express').Router()

const bcrypt = require('bcrypt')
const User = require('../models/User')

userRouter.post('/', async (req, res, next) => {
  const { name, username, password } = req.body

  if (password.length < 3) return res.status(400).send({ error: 'password should be at least 3 characters long' }).end()

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = {
    name: name,
    username: username,
    passwordHash
  }

  const user = new User(newUser)

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser).end()
  } catch (err) {
    next(err)
  }
})

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1
    })
    res.status(200).json(users).end()
  } catch (err) { next(err) }
})

module.exports = userRouter
