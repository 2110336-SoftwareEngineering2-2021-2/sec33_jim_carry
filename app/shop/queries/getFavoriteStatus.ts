import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetFavoriteInput = z.object({
  shopId: z.number(),
})

const getFavoriteStatus = resolver.pipe(
  resolver.zod(GetFavoriteInput),
  async ({ shopId }, { session }) => {
    if (!session.userId) {
      return false
    }
    const shop = await db.shop.count({
      where: {
        id: shopId,
        followers: {
          some: {
            id: session.userId,
          },
        },
      },
    })

    if (shop) {
      return true
    }
    return false
  }
)

export default getFavoriteStatus
