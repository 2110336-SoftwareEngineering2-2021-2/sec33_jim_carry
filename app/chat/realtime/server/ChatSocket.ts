import { Socket } from 'socket.io'

import { ChatId, ClientEvents, ServerEvents } from '../types'
import { ChatManager } from './ChatManager'

export class ChatSocket {
  private manager: ChatManager
  private userId: number | null
  private socket: Socket<ClientEvents, ServerEvents>
  private observedIds: ChatId[] = []

  constructor(
    manager: ChatManager,
    socket: Socket<ClientEvents, ServerEvents>
  ) {
    this.manager = manager
    this.socket = socket

    this.socket.on('setUserId', this.onSetUserId)
    this.socket.on('observeChats', this.onObserveChats)
    this.socket.on('sendTyping', this.sendTyping)
  }

  private onSetUserId = (userId: number | null) => {
    this.userId = userId
  }

  private onObserveChats = (chatIds: ChatId[]) => {
    const toJoin = new Set(chatIds)
    const toLeave = new Set(this.observedIds)

    // remove existing ids from join set
    this.observedIds.forEach((id) => toJoin.delete(id))
    // remove new ids from leave set
    chatIds.forEach((id) => toLeave.delete(id))

    toJoin.forEach((id) => this.socket.join(`chat:${id}`))
    toLeave.forEach((id) => this.socket.leave(`chat:${id}`))
  }

  private sendTyping = (chatId: ChatId, isTyping: boolean) => {
    if (!this.userId) return
    this.manager.handleTyping(chatId, this.userId, isTyping)
  }
}
