import { resolver } from 'blitz'
import db, { Chat, ChatMember, Message } from 'db'

export type ChatData = Chat & {
  memberships: (ChatMember & {
    user: {
      shop: {
        name: string
        image: string | null
      } | null
      name: string | null
    }
  })[]
  messages: Message[]
}

/**
 * Get a list of chats, with last message in chat.
 */
const listChats = resolver.pipe(
  resolver.authorize(),
  async (_, { session }) => {
    const shopCount = await db.shop.count({
      where: { id: session.userId },
    })
    const hasShop = shopCount > 0
    const chats = await db.chat.findMany({
      where: {
        memberships: {
          some: {
            userId: session.userId as number,
          },
        },
      },
      include: {
        memberships: {
          include: {
            user: {
              select: {
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
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return { userId: session.userId, chats, hasShop }
  }
)

export default listChats
