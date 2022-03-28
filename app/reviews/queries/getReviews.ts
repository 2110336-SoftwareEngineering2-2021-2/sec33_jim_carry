import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const GetReviewsInput = z.object({
  by: z.enum(['product', 'shop']),
  id: z.number(),
})

const getReviews = resolver.pipe(
  resolver.zod(GetReviewsInput),
  resolver.authorize(),
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
          product: { select: { name: true } },
        },
      })
    }
    return reviews
  }
)

export default getReviews
