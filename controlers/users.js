const bcrypt = require('bcrypt')
const User = require('../models/User')

const createUser = async (req, res, next) => {
  const { body } = req

  if (body.password.length < 3) return res.status(400).send({ error: 'password should be at least 3 characters long' }).end()

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = {
    name: body.name,
    username: body.username,
    password: passwordHash
  }

  const user = new User(newUser)

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser).end()
  } catch (err) {
    next(err)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1
    })
    res.status(200).json(users).end()
  } catch (err) { next(err) }
}

module.exports = { createUser, getAllUsers }
