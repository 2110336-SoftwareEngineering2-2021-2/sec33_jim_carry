import { resolver } from 'blitz'
import db from 'db'

import { MarkAsRead } from '../realtime/validations'

const markAsRead = resolver.pipe(
  resolver.zod(MarkAsRead),
  resolver.authorize(),
  async ({ chatId, messageId }, { session }) => {
    await db.chatMember.update({
      data: {
        lastMessageReadId: messageId,
      },
      where: {
        chatId_userId: {
          chatId,
          userId: session.userId,
        },
      },
    })
  }
)

export default markAsRead
