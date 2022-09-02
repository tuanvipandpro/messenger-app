import roomModel from '../model/room'

module.exports = {
  createRoom: (req, res) => {
    new roomModel({createdAt: new Date()}).save()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error : e, msg: 'Something error !!!'})
    })
    res.status(200)
  }
}