import chatModel from '../model/chat'
import { Schema } from 'mongoose'

module.exports = {
  createChatForUserInRoom: (req, res) => {
    const chatObj = {
      text: req.body.text,
      createdAt: new Date(),
      roomId: req.body.roomId,
      user: req.user
    }

    new chatModel(chatObj).save()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error : e, msg: 'Something error !!!'})
    })

  },
  getChatsByRoomId: (req, res) => {
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