import { paginate, resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const GetReviewsByProductInput = z.object({
  productId: z.number(),
})

const getReviewsByProduct = resolver.pipe(
  resolver.zod(GetReviewsByProductInput),
  resolver.authorize(),
  async ({ productId }) => {
    const reviews = await db.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } },
    })

    return reviews
  }
)

export default getReviewsByProduct
