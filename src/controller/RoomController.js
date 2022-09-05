import roomModel from '../model/room'
import { checkEmptyObject } from '../utils/commonUtils'

module.exports = {
  /*
  * Create chat room for 2 user if not exist
  * Type: SINGLE
  */
  openRoomForSingleChat: async (req, res) => {
    const usersInRoom = req.body // array of email user in room
    const filter = {
      users: usersInRoom
    }

    roomModel.findOne(filter).then(async (doc, err) => {
      if (!checkEmptyObject(doc)) {
        const singleRoom = {
          createdAt: new Date(),
          type: 'SINGLE',
          users: usersInRoom
        }
        const room = await new roomModel(singleRoom).save()
        res.status(200).json(room)
      } else {
        res.status(200).json(doc)
      }
    }).catch(err => {
      console.error(err)
      res.status(500).json({error : e, msg: 'Something error !!!'})
    })
  }
}