// app/Controllers/Ws/SocketController.ts
export default class SocketController {
    public async onConnect(socket) {
      console.log(`Client connected: ${socket.id}`)
      socket.emit('news', { hello: 'world' })
    }
  
    public async onNews(socket, data) {
      console.log(`News received: ${JSON.stringify(data)}`)
      socket.emit('response', { message: 'Acknowledged!' })
    }
  
    public async onDisconnect(socket) {
      console.log(`Client disconnected: ${socket.id}`)
    }
  }
  