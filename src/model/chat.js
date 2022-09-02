import {Schema, model} from 'mongoose'

const chatSchema = Schema({
  text: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    require: true
  },
  roomId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  user: {
    _id: Schema.Types.ObjectId,
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
  }
})

module.exports = model('chat', chatSchema, 'chat')