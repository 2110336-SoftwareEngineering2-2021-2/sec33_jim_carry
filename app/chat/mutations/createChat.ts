import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateChatInput = z.object({
  shopOwnerId: z.number(),
})

const createChat = resolver.pipe(
  resolver.zod(CreateChatInput),
  resolver.authorize(),
  async ({ shopOwnerId }, { session }) => {
    const currentUserId = session.userId as number
    const chat = await db.chat.findFirst({
      where: {
        AND: [
          { memberships: { some: { userId: shopOwnerId } } },
          { memberships: { some: { userId: currentUserId } } },
        ],
      },
    })

    if (chat) {
      return chat
    }

    const newChat = await db.chat.create({
      data: {
        memberships: {
          create: [
            {
              user: {
                connect: { id: shopOwnerId },
              },
              isShop: true,
            },
            {
              user: {
                connect: { id: currentUserId },
              },
              isShop: false,
            },
          ],
        },
      },
    })
    return newChat
  }
)

export default createChat
