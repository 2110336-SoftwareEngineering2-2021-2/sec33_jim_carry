import { resolver } from 'blitz'
import db, { ShopStatus } from 'db'

/**
 * Get all the shops that has been registered to the system
 *
 * @returns All the requested shops with the User included
 */
const getRequestShops = resolver.pipe(resolver.authorize(), async () => {
  return db.shop.findMany({
    where: {
      shopStatus: ShopStatus.REQUESTED,
    },
    include: {
      user: true,
    },
  })
})

export default getRequestShops
