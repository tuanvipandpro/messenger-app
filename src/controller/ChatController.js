import chatModel from '../model/chat'
import { Schema } from 'mongoose'

module.exports = {
  createChat: (req, res) => {
    const chatObj = {
      text: req.body.text,
      createdAt: new Date(),
      roomId: Schema.Types.ObjectId(req.body.roomId),
      user: req.body.user
    }

    new chatModel(chatObj).save()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error : e, msg: 'Something error !!!'})
    })
    res.status(200)
  },
  getChatbyRoomId: (req, res) => {
    const filter = {roomId: req.query.roomId}

    const sort = {
      createdAt: -1
    }

    chatModel.find(filter).sort(sort).then(response => {
      res.status(200).json(response)
    }).catch(e => {
      res.status(500).json({error : e, msg: 'Something error !!!'})
    })
  }
}