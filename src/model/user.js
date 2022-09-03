import {Schema, model} from 'mongoose'

const userSchema = Schema({
  email: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  isDisable: {
    type: Boolean,
    require: true
  }
})

module.exports = model('user', userSchema, 'user')