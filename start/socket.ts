import Ws from 'App/Services/Ws'
import SocketController from 'App/Controllers/Ws/SocketController'
const socketController = new SocketController()
import socketAuth from 'App/Middleware/SocketAuth'

const wsServer = new Ws()

wsServer.boot()

wsServer.io?.use(socketAuth)

wsServer.io?.on('connection', (socket) => {
  socketController.onConnect(socket)

  socket.on('getAllChats', (data) => socketController.getAllChats(socket, data,wsServer.io))
  socket.on('sendMessage', (data) => socketController.sendMessage(socket, data,wsServer.io))
  socket.on('createNewChat', (data) => socketController.createNewChat(socket, data,wsServer.io))
  socket.on('disconnect', () => socketController.onDisconnect(socket))
})
