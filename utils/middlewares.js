
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  let token
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  } else token = null
  req.body.token = token
  next()
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') return res.status(400).send({ error: 'Data Malformed' }).end()
  if (err.name === 'ValidationError') return res.status(400).send({ error: err.message }).end()
  if (err.name === 'JsonWebTokenError') return res.status(401).send({ error: 'invalid Token' }).end()
}

module.exports = { errorHandler, tokenExtractor }
