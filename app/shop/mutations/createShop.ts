import { resolver } from 'blitz'
import db, { ShopStatus } from 'db'

import { CreateShop } from '../validations'

/**
 * Create Shop for User when the user register it.
 *
 * @param input Shop information including bio, phoneNo, name, image, and citizenId
 *
 * @returns The Shop that user has created
 */
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
