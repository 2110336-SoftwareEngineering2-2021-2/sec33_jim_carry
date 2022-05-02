import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const GetReviewsInput = z.object({
  by: z.enum(['product', 'shop']),
  id: z.number(),
})

/**
 * Get reviews by shopId or productId
 *
 * @returns All reviews for the specified shop or product
 */

const getReviews = resolver.pipe(
  resolver.zod(GetReviewsInput),
  async ({ id, by }) => {
    let reviews
    if (by === 'product') {
      reviews = await db.review.findMany({
        where: { productId: id },
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true } } },
      })
    } else {
      reviews = await db.review.findMany({
        where: { shopId: id },
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true } },
          product: { select: { id: true, name: true } },
        },
      })
    }
    return reviews
  }
)

export default getReviews
