import { AuthorizationError, Ctx, resolver } from 'blitz'
import db, { Prisma } from 'db'

interface CountProductsInput extends Pick<Prisma.OrderFindManyArgs, 'where'> {}

/**
 * Count orders that satisfies the filter
 *
 * @returns The orders with the specify filter along with shop and orderitemsnapshot
 */
const countOrders = resolver.pipe(
  async ({ where }: CountProductsInput, { session }: Ctx) => {
    const count = await db.order.count({
      where,
    })

    return count
  }
)
export default countOrders
