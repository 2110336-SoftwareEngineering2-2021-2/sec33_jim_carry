import { AuthorizationError, Ctx, NotFoundError, resolver } from 'blitz'
import db from 'db'
import * as z from 'zod'

/**
 * Get orders for the user
 *
 * @param input - Filter for the order to show
 * @returns The orders with the specify filter along with shop and orderitemsnapshot
 */

const GetOrder = z.object({
  status: z.enum(['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED']),
})

const getOrders = resolver.pipe(
  resolver.zod(GetOrder),
  async (input, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const orders = await db.order.findMany({
      where: { status: input.status },
      orderBy: { createdAt: 'desc' },
      include: { shop: true, items: true },
    })
    if (!orders) {
      throw new NotFoundError()
    }

    return orders
  }
)
export default getOrders
