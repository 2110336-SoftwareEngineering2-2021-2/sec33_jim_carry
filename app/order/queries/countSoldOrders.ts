import { AuthorizationError, Ctx, resolver } from 'blitz'
import db, { Prisma } from 'db'

/**
 * Count orders that satisfies the filter
 *
 * @returns The orders with the specify filter along with shop and orderitemsnapshot
 */
interface CountProductsInput extends Pick<Prisma.OrderFindManyArgs, 'where'> {}

const countOrders = resolver.pipe(
  async ({ where }: CountProductsInput, { session }: Ctx) => {
    const count = await db.order.count({
      where,
    })

    return count
  }
)
export default countOrders
