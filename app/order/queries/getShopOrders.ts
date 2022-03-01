import { resolver, NotFoundError, AuthorizationError, Ctx } from 'blitz'
import db, { Prisma } from 'db'

const getShopOrders = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session: { userId } }) => {
    // Authorize user
    if (!userId) throw new AuthorizationError()
    //get Shop from userId
    const shop: Prisma.Shop = await db.shop.findFirst({
      where: { userId },
      include: { order: true },
    })
    if (!shop) throw new NotFoundError('User Shop Not Found')

    return shop.order
  }
)

export default getShopOrders
