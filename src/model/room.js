import {Schema, model} from 'mongoose'

const roomSchema = Schema({
  createdAt: {
    type: Date,
    require: true
  },
  type: {
    type: String,
    require: true,
    enum: ['SINGLE', 'MULTIPLE']
  },
  users: [String],
})

module.exports = model('room', roomSchema, 'room')