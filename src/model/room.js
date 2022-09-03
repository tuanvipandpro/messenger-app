import {Schema, model} from 'mongoose'

const roomSchema = Schema({
  createdAt: {
    type: Date,
    require: true
  },
  listUser: [Schema.Types.ObjectId],
})

module.exports = model('room', roomSchema, 'room')