import { Server } from "socket.io"

export const socketConfig = (server) => {
  const io = new Server(server, {})

  io.on('connect', socket => {
    console.log(`${socket.id} is connected !!!`)

    socket.on('disconnect', data => {
      //TODO
    })
  })
}