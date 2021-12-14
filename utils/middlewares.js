const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') return res.status(400).send({ error: 'Data Malformed' }).end()
  if (err.name === 'ValidationError') return res.status(400).send({ error: err.message }).end()
}

module.exports = { errorHandler }
