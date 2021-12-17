const loginRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res, next) => {
  const {
    username,
    password
  } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) return res.status(401).json({ error: 'user or password incorrect' })

  const userForToken = {
    username: user.username,
    id: user.id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({
    username: user.username,
    id: user.id,
    token
  }).end()
})

module.exports = loginRouter
