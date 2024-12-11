import ChatService from "App/Services/ChatService"
import UserService from "App/Services/UserService"

export default class SocketController {
    private chatService
    private userService
    constructor(){
      this.chatService = new ChatService()
      this.userService = new UserService()
    }
    public async onConnect(socket) {
      this.userService.setUserSocketId(socket.user.id,socket.id)
    }
    
    public async getAllChats(socket, data, io) {
      try{
        const chats = await this.chatService.getAllChats(socket.user)
        socket.emit('getAllChatsResponse',  chats )
      }catch(err){
        this.erroHandle(socket,io,err)
      }
    }

    public async sendMessage(socket, data, io) {
      try{
        const { text, chatOpened:{ id } } = data
        const newMessage = await this.chatService.sendMessage(text,id,socket.user.id)
        const users = await this.chatService.getChatUsers(id)
        users.forEach(user => {
          const targetSocket = io.sockets.sockets.get(user.socketId)
          if(targetSocket) targetSocket.emit('msg:add',newMessage)
        });
      }catch(err){
        console.log('erro controler ao enviar mensagem')
        this.erroHandle(socket,io,err)
      }
    }

    public async createNewChat(socket,data,io) {
      try{
        const { user } = data
  
        const { newChat } = await this.chatService.createNewChat(socket.user,user)
  
        const users = await this.chatService.getChatUsers(newChat.id)
  
        users.forEach(async user => {
          const targetSocket = io.sockets.sockets.get(user.socketId)
          if(targetSocket){
            await newChat.preload('users')
            await newChat.preload('mensagens', (query) => {
              query.orderBy('id', 'asc')
            })
            targetSocket.emit('chat:add',newChat)
          }
        });
      }catch(err){
        this.erroHandle(socket,io,err)
      }
    }

    public async onDisconnect(socket) {
      console.log(`Client disconnected: ${socket.id}`)
    }

    public async erroHandle(socket,io,erro) {
      const user = await this.userService.getUserById(socket.user.id)
      const targetSocket = io.sockets.sockets.get(user.socketId)
      console.log(socket.user.socketId,targetSocket)
      if(targetSocket){
        console.log(targetSocket)
        targetSocket.emit('error',{message: erro})
      }
    }
  }
  