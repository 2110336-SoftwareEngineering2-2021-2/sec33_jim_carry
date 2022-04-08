import { resolver, NotFoundError, AuthorizationError } from 'blitz'
import db, { Prisma } from 'db'

/**
 * Get Orders from user's shop
 *
 * @returns An array of Orders if user has the shop
 */
const getShopOrders = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session: { userId } }) => {
    //get Shop from userId
    const shop = await db.shop.findUnique({
      where: { userId },
      include: {
        Order: {
          include: {
            owner: true,
            items: true,
          },
        },
      },
      rejectOnNotFound: true,
    })

    return shop.Order
  }
)

export default getShopOrders
