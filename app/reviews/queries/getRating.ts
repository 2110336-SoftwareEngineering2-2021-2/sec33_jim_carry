import { resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const GetRatingInput = z.object({
  by: z.enum(['product', 'shop']),
  id: z.number(),
})

/**
 * Get average rating from all reviews for a product or shop
 */
const getRating = resolver.pipe(
  resolver.zod(GetRatingInput),
  async ({ id, by }) => {
    const where: Prisma.ReviewWhereInput =
      by === 'product' ? { productId: id } : { shopId: id }
    const rating = await db.review.aggregate({
      where,
      _avg: {
        rating: true,
      },
      _count: true,
    })
    return {
      rating: rating._avg.rating,
      count: rating._count,
    }
  }
)

export default getRating
