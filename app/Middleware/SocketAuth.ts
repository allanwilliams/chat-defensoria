// app/Middleware/SocketAuth.ts
import User from "App/Models/User"
export default async function socketAuth(socket, next) {
    const token = socket.handshake.auth
    if (token && token.user){
      const user = await User.findBy('id',token.user.id)
      socket.user = user
    }

    next()
    
  
    if (!token) {
      return next(new Error('Authentication error'))
    }
  
    try {
      // Valide o token aqui (JWT, OAuth, etc.)
      // Por exemplo, usando um service:
      // const user = await AuthService.verifyToken(token)
      // socket.user = user
  
      next() // Continuação caso a autenticação seja bem-sucedida
    } catch (error) {
      next(new Error('Authentication error'))
    }
  }
  