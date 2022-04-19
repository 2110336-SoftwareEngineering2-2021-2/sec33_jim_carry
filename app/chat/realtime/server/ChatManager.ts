import { Message } from '@prisma/client'
import { Server as SocketIoServer, Socket } from 'socket.io'

import { ClientEvents, ServerEvents } from '../types'
import { authenticateSocket } from '../utils'
import { ChatSocket } from './ChatSocket'

export class ChatManager {
  private io: SocketIoServer<ClientEvents, ServerEvents>

  initialize = (io: SocketIoServer) => {
    this.io = io
    this.io.on('connection', this.handleConnection)
  }

  private handleConnection = async (socket: Socket) => {
    try {
      const userId = await authenticateSocket(socket)
      new ChatSocket(this, socket, userId)
    } catch (e) {
      socket.disconnect()
    }
  }

  handleNewMessage = (message: Message) => {
    this.io.to(`chat:${message.chatId}`).emit('newMessage', message)
  }

  handleTyping = (chatId: number, userId: number, isTyping: boolean) => {
    this.io
      .to(`chat:${chatId}`)
      .emit('userTyping', { chatId, userId, isTyping })
  }
}
