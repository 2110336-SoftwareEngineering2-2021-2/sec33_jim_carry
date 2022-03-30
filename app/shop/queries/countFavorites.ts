import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CountFavoritesInput = z.object({
  shopId: z.number(),
})

const countFavorites = resolver.pipe(
  resolver.zod(CountFavoritesInput),
  async ({ shopId }) => {
    const shop = await db.shop.findFirst({
      where: {
        id: shopId,
      },
      include: {
        _count: {
          select: {
            followers: true,
          },
        },
      },
    })

    if (!shop) throw new NotFoundError()

    return shop._count.followers
  }
)

export default countFavorites
