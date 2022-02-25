import { resolver, Ctx } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const CreateChatInput = z.object({
  shopOwnerId: z.number(),
})

const createChat = resolver.pipe(
  resolver.zod(CreateChatInput),
  resolver.authorize(),
  async ({ shopOwnerId }, { session }: Ctx) => {
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
      console.log(
        `Chat already exists! User ${currentUserId} and shop owner ${shopOwnerId}`
      )
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
    console.log(
      `Created new chat! User ${currentUserId} and shop owner ${shopOwnerId}`
    )
    return newChat
  }
)

export default createChat
