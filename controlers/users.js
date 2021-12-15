const bcrypt = require('bcrypt')
const User = require('../models/User')

const createUser = async (req, res, next) => {
  const { body } = req
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
    res.status(200).json(savedUser).end()
  } catch (err) {
    next(err)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200).json(users).end()
  } catch (err) { next(err) }
}

module.exports = { createUser, getAllUsers }
