import { AuthorizationError, Ctx, NotFoundError, resolver } from 'blitz'
import db from 'db'
import * as z from 'zod'

/**
 * Get orders for the user
 *
 * @returns The orders with the specify filter along with shop and orderitemsnapshot
 */

const getOrders = resolver.pipe(async (_ = null, { session }: Ctx) => {
  if (!session.userId) throw new AuthorizationError()

  const orders = await db.order.findMany({
    where: { ownerId: session.userId },
    orderBy: { createdAt: 'desc' },
    include: { shop: true, items: true },
  })
  if (!orders) {
    throw new NotFoundError()
  }

  return orders
})
export default getOrders
