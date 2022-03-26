import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const GetReviewsByShopInput = z.object({
  shopId: z.number(),
})

const getReviewsByShop = resolver.pipe(
  resolver.zod(GetReviewsByShopInput),
  resolver.authorize(),
  async ({ shopId }) => {
    const reviews = await db.review.findMany({
      where: { shopId },
      orderBy: { createdAt: 'desc' },
    })

    return reviews
  }
)

export default getReviewsByShop
