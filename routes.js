import UserController from './src/controller/UserController'
import RoomController from './src/controller/RoomController'
import ChatController from './src/controller/ChatController'

module.exports = (app) => {
  // app.route('/')
  //   .get((req, res) => res.send('Hello World'))
  
  app.route('/auth/login')
    .post(UserController.loginWithFirebaseToken)

  app.route('/api/users')
    .get(UserController.getUserAvailable)

  app.route('/api/chatRoom')
    .post(RoomController.openRoomForSingleChat)

  app.route('/api/chats')
    .get(ChatController.getChatsByRoomId)
    .post(ChatController.createChatForUserInRoom)
}