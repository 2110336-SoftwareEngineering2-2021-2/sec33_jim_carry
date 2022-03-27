import { resolver } from 'blitz'
import db, { ShopStatus } from 'db'

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
