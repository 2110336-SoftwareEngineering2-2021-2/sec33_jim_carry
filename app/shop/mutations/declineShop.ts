import { resolver } from 'blitz'
import db, { ShopStatus } from 'db'
import { z } from 'zod'

const DeclineShop = z.object({
  shopId: z.number(),
})

/**
 * Decline the registed shop by admin.
 *
 * @param input.shopId Shop Id
 *
 * @returns The Shop that has been declined
 */
const declineShop = resolver.pipe(
  resolver.zod(DeclineShop),
  resolver.authorize(),
  async ({ shopId }) => {
    return db.shop.update({
      data: {
        shopStatus: ShopStatus.DECLINED,
      },
      where: {
        id: shopId,
      },
    })
  }
)

export default declineShop
