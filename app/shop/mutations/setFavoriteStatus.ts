import { resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

export const SetFavoriteStatus = z.object({
  shopId: z.number(),
  favorite: z.boolean(),
})

/**
 * Set current user's favorite status for a shop
 */
const setFavoriteStatus = resolver.pipe(
  resolver.zod(SetFavoriteStatus),
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

export default setFavoriteStatus
