import { resolver } from 'blitz'
import db, { ShopStatus } from 'db'

import { CreateShop } from '../validations'

const createShop = resolver.pipe(
  resolver.zod(CreateShop),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
    const { bio, phoneNo, name, image, citizenId } = input
    const user = await db.user.findFirst({
      where: { id: userId },
      include: { shop: true },
      rejectOnNotFound: true,
    })
    const { shop } = await db.user.update({
      where: { id: userId },
      data: {
        citizenId,
        shop: {
          [user.shop ? 'update' : 'create']: {
            bio,
            phoneNo,
            name,
            image,
            totalSale: 0,
            shopStatus: ShopStatus.REQUESTED,
          },
        },
      },
      include: { shop: true },
    })
    return shop
  }
)

export default createShop
