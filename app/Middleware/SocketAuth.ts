// app/Middleware/SocketAuth.ts
import UserService from "App/Services/UserService"

export default async function socketAuth(socket, next) {
    const token = socket.handshake.auth
    if (token && token.user){
      const us = new UserService()
      const user = await us.getUserById(token.user.id)
      if(!user){
        throw new Error('Usuário Não localizado');
      }
      socket.user = user
      try {
        next() // Continuação caso a autenticação seja bem-sucedida
      } catch (error) {
        next(new Error('Authentication error'))
      }
    }
  }
  