import { resolver, NotFoundError, AuthorizationError } from 'blitz'
import db, { Prisma } from 'db'

const getShopOrders = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session: { userId } }) => {
    // Authorize user
    if (!userId) throw new AuthorizationError()
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
