import {Schema, model} from 'mongoose'

const roomSchema = Schema({
  // id: Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    require: true
  }
  // lastMsg: {
  //   text: {
  //     type: String,
  //     require: true      
  //   },
  //   createdAt: {
  //     type: Date,
  //     require: true      
  //   }
  // },
})

module.exports = model('room', roomSchema, 'room')