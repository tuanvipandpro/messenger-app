import UserController from './src/controller/UserController'
import RoomController from './src/controller/RoomController'

module.exports = (app) => {
  app.route('/')
    .get((req, res) => {
      res.send('Hello World')
    })

  app.route('/api/user')
    .post(UserController.createUser)

  app.route('/api/room')
    .post(RoomController.createRoom)
}