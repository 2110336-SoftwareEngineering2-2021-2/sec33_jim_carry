import { resolver, Ctx } from 'blitz'
import db, { Chat, ChatMember, Message } from 'db'
import { z } from 'zod'

const CreateChatInput = z.object({
  isShopChat: z.boolean(),
})

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
  resolver.zod(CreateChatInput),
  resolver.authorize(),
  async ({ isShopChat }, { session }: Ctx) => {
    const chats = await db.chat.findMany({
      where: {
        memberships: {
          some: {
            userId: session.userId as number,
            isShop: isShopChat,
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

    return chats
  }
)

export default listChats
