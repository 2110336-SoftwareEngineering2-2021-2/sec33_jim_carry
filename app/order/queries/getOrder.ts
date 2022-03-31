import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetOrderInput = z.object({
  orderId: z.number(),
})

const getOrder = resolver.pipe(
  resolver.zod(GetOrderInput),
  async ({ orderId }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { shop: true, items: true },
    })

    if (!order) {
      throw new Error('Order not found')
    }
    if (session.userId !== order.ownerId) {
      throw new AuthorizationError('You do not own this order')
    }

    return order
  }
)

export default getOrder
