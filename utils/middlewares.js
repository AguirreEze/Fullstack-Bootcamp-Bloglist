const errorHandler = (err, req, res, next) => {
  console.log(err.name)
  if (err.name === 'CastError') return res.status(400).send({ error: 'Data Malformed' }).end()
  if (err.name === 'ValidationError') return res.status(400).send({ error: err.message }).end()
  if (err.name === 'JsonWebTokenError') return res.status(401).json({ error: 'invalid token' })
}

module.exports = { errorHandler }
