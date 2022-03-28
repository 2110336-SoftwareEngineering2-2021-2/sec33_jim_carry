import { NotFoundError, resolver } from 'blitz'
import db from 'db'

import { GetChat } from '../validations'

/**
 * Get a specific chat, with all messages.
 */
const getChat = resolver.pipe(
  resolver.zod(GetChat),
  resolver.authorize(),
  async ({ chatId, productId }, { session }) => {
    const userId = session.userId
    const chat = await db.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                shop: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      rejectOnNotFound: true,
    })

    const product = productId
      ? await db.product.findUnique({
          where: { id: productId },
          rejectOnNotFound: true,
        })
      : null

    const isInChat = chat.memberships.some(
      (membership) => membership.userId === userId
    )
    if (!isInChat) throw new NotFoundError('Chat not found')
    return { userId, chat, product }
  }
)

export default getChat
