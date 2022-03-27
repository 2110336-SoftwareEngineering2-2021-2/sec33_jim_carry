import { resolver } from 'blitz'
import db, { ShopStatus } from 'db'

import { CreateShop } from '../validations'

const createShop = resolver.pipe(
  resolver.zod(CreateShop),
  resolver.authorize(),
  async (input, { session }) => {
    const { bio, phoneNo, name, image, citizenId } = input
    const { shop } = await db.user.update({
      where: {
        id: session.userId,
      },
      data: {
        citizenId: citizenId,
        shop: {
          create: {
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
