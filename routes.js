import UserController from './src/controller/UserController'
import RoomController from './src/controller/RoomController'

module.exports = (app) => {
  app.route('/')
    .get((req, res) => res.send('Hello World'))
  
  app.route('/auth/login')
    .post(UserController.loginWithFirebaseToken)

  app.route('/api/users')
    .get(UserController.getUserAvailable)

  app.route('/api/room')
    .post(RoomController.createRoom)
}