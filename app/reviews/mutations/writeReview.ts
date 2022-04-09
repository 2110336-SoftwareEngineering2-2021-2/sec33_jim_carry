import { AuthorizationError, resolver } from 'blitz'
import db from 'db'

import { WriteReview } from '../validations'

/**
 * Create reviews
 *
 * @returns The created reviews
 */

const writeReview = resolver.pipe(
  resolver.zod(WriteReview),
  resolver.authorize(),
  async (input, { session }) => {
    const { orderId, reviews } = input

    const order = await db.order.findFirst({
      where: { id: orderId },
      include: { items: true },
    })
    if (!order) throw new Error('Order not found')
    if (order.ownerId !== session.userId) {
      throw new AuthorizationError('You do not own this order')
    }
    if (order.status !== 'COMPLETED') {
      throw new Error('Order must be completed to write a review')
    }

    reviews.forEach(({ productId, rating, title, comment }) => {
      const product = order.items.find((item) => item.productId === productId)
      if (!product) throw new Error('Product not found')
    })
    const reviewsData = reviews.map((review) => ({
      ...review,
      shopId: order.shopId,
      userId: order.ownerId,
    }))
    await db.review.createMany({ data: reviewsData })
    await db.order.update({
      where: { id: orderId },
      data: { status: 'REVIEWED' },
    })
    return reviewsData
  }
)

export default writeReview
