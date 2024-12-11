import { Server } from 'socket.io'
import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
  public io: Server | null = null
  private booted = false

  public boot() {
    if (this.booted) {
      return
    }

    this.booted = true

    if (!AdonisServer.instance) {
      throw new Error('Adonis HTTP server is not initialized.')
    }

    this.io = new Server(AdonisServer.instance, {
      cors: {
        origin: '*', // Permitir todas as origens (para desenvolvimento)
        methods: ['GET', 'POST'], // Métodos aceitos
      },
    })

    console.log('Socket.IO server initialized.')
  }
}

export default Ws
