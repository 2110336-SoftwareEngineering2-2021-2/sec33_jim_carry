import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const createChat = resolver.pipe(
  resolver.zod(z.number()),
  resolver.authorize(),
  async (shopId, { session }) => {
    const currentUserId = session.userId as number

    const { userId: shopOwnerId } = await db.shop.findUnique({
      where: {
        id: shopId,
      },
      select: {
        userId: true,
      },
      rejectOnNotFound: true,
    })

    const chat = await db.chat.findFirst({
      where: {
        AND: [
          { memberships: { some: { userId: shopOwnerId } } },
          { memberships: { some: { userId: currentUserId } } },
        ],
      },
      select: {
        id: true,
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
              type: 'SELLER',
            },
            {
              user: {
                connect: { id: currentUserId },
              },
              type: 'BUYER',
            },
          ],
        },
      },
      select: {
        id: true,
      },
    })
    return newChat
  }
)

export default createChat
