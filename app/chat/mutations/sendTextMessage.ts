import { resolver } from 'blitz'
import db from 'db'

import { SendTextMessage } from '../realtime/validations'

const sendTextMessage = resolver.pipe(
  resolver.zod(SendTextMessage),
  resolver.authorize(),
  async ({ chatId, message }, ctx) => {
    const messageObj = await db.message.create({
      data: {
        type: 'TEXT',
        payload: message,
        sender: {
          connect: {
            id: ctx.session.userId,
          },
        },
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
    })
    ctx.chatManager.handleNewMessage(messageObj)
  }
)

export default sendTextMessage
