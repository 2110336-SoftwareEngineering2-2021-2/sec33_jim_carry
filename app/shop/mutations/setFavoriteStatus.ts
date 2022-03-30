import { resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

export const CreateShop = z.object({
  shopId: z.number(),
  favorite: z.boolean(),
})

const createShop = resolver.pipe(
  resolver.zod(CreateShop),
  resolver.authorize(),
  async ({ shopId, favorite }, { session }) => {
    const followers: Prisma.UserUpdateManyWithoutFollowingInput = favorite
      ? {
          connect: {
            id: session.userId,
          },
        }
      : {
          disconnect: {
            id: session.userId,
          },
        }
    const shop = await db.shop.update({
      where: {
        id: shopId,
      },
      data: {
        followers,
      },
    })
    return shop
  }
)

export default createShop
