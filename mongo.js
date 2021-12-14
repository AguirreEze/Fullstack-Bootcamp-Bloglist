const { connect } = require('mongoose')

require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const connectionString = MONGODB_URI

connect(connectionString)
  .then(console.log('Connected to MongoDB'))
  .catch(console.error)
