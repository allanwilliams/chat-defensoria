import Chat from "App/Models/Chat"
import ChatUser from "App/Models/ChatUser"
import Mensagem from "App/Models/Mensagem"

export default class ChatService {
  async getAllChats(user){
    const chats = await user.related('chats')
      .query()
      .preload('users')
      .preload('mensagens', (query) => {
        query.orderBy('id', 'asc')  // Ordena as mensagens pelo id de forma crescente
      })
    return chats
  }

  async sendMessage(text, chatId,createdBy) {
    try{
      return await Mensagem.create({
        body: text,
        chatId,
        createdBy
      })
    }catch{
      console.log('error ao enviar mensagem')
      throw new Error('Falha ao enviar mensagem');
    }
  }

  async getChatUsers(chatId) {
    const chat = await Chat.findBy('id',chatId)
    const users = await chat?.related('users').query()
    return users
  }

  async createNewChat(from,to) {
    const newChat = await Chat.create({})
    const chatUserFrom = await ChatUser.create({chatId:newChat.id, userId: from.id})
    const chatUserTo = await ChatUser.create({chatId:newChat.id, userId: to.id})

    return {
      newChat,
      chatUserFrom,
      chatUserTo
    }
  }

}
