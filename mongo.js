const { connect } = require('mongoose')

require('dotenv').config()

const connectionString = process.env.MONGODB_URI

connect(connectionString)
  .then(console.log('Connected to MongoDB'))
  .catch(console.error)
