import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

/**
 * Get a specific chat, with all messages.
 */
const getChat = resolver.pipe(
  resolver.zod(z.number()),
  resolver.authorize(),
  async (chatId, { session }) => {
    const userId = session.userId
    const chat = await db.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        memberships: {
          select: { userId: true },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      rejectOnNotFound: true,
    })
    const isInChat = chat.memberships.some(
      (membership) => membership.userId === userId
    )
    if (!isInChat) throw new NotFoundError('Chat not found')
    return { userId, chat }
  }
)

export default getChat
