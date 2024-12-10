import Ws from 'App/Services/Ws'
import SocketController from 'App/Controllers/Ws/SocketController'
const socketController = new SocketController()
import socketAuth from 'App/Middleware/SocketAuth'

Ws.boot()

Ws.io?.use(socketAuth)

// Ws.io?.use(async (socket, next) => {
//   try {
//     // Obtém os cookies da requisição
//     const cookies = socket.handshake.headers.cookie
//     if (!cookies) {
//         throw new Error('No cookies found')
//     }
//     const { 'adonis-session': sessionId } = parseCookies(cookies)

//     if (!sessionId) {
//       throw new Error('Session cookie not found')
//     }
//     console.log(sessionId)
//     // const session = await Session.client().load({id: sessionId}>)
//     // console.log(session.session.get('user'))
//     // Verifica se a sessão contém um usuário autenticado
    
//     // const session = await Session.load(sessionId)
//     // const user = session.get('user')
//     // console.log(user)
//     // if (!user) {
//     //   throw new Error('User not authenticated')
//     // }

//     // Associar o usuário autenticado ao socket
//     socket.data.user = null
//     next()
//   } catch (error) {
//     console.log(error)
//     next(new Error('Authentication error'))
//   }
// })
  
function parseCookies(cookieHeader: string) {
    return cookieHeader.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map((part) => part.trim())
        cookies[name] = value
        return cookies
    }, {} as Record<string, string>)
}

// Gerenciar eventos Socket.IO
Ws.io?.on('connection', (socket) => {
  const user = socket.data.user // Usuário autenticado
  console.log(`User connected: ${user?.email}`)

  socketController.onConnect(socket)

  socket.on('news', (data) => socketController.onNews(socket, data))
  socket.on('disconnect', () => socketController.onDisconnect(socket))
})
