const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'username should be at least 3 characters long']
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog'
  }]
})

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
}).plugin(uniqueValidator, { message: 'Error, Expected {PATH} to be unique' })

const User = model('User', userSchema)

module.exports = User
