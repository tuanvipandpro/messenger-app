import { Server } from "socket.io"

export const socketConfig = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connect', socket => {
    console.log(`${socket.id} is connected !!!`)
    io.emit('online', socket.id)

    socket.on('disconnect', () => {
      io.emit('offline', socket.id)
    })

    socket.on('sendMsg', data => {
      
    })
  })
}