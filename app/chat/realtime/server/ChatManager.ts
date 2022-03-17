import { Message } from '@prisma/client'
import { Server as SocketIoServer, Socket } from 'socket.io'

import { ClientEvents, ServerEvents } from '../types'
import { ChatSocket } from './ChatSocket'

export class ChatManager {
  private io: SocketIoServer<ClientEvents, ServerEvents>

  initialize = (io: SocketIoServer) => {
    this.io = io
    this.io.on('connection', this.handleConnection)
  }

  private handleConnection = (socket: Socket) => {
    new ChatSocket(this, socket)
  }

  handleNewMessage = (message: Message) => {
    this.io.to(`chat:${message.chatId}`).emit('newMessage', message)
  }

  handleTyping = (chatId: number, userId: number) => {
    this.io.to(`chat:${chatId}`).emit('userTyping', { chatId, userId })
  }
}
