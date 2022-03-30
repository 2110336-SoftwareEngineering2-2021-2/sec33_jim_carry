import { resolver } from 'blitz'
import db, { ShopStatus } from 'db'
import { z } from 'zod'

const ApproveShop = z.object({
  shopId: z.number(),
})

const approveShop = resolver.pipe(
  resolver.zod(ApproveShop),
  resolver.authorize(),
  async ({ shopId }) => {
    return db.shop.update({
      data: {
        shopStatus: ShopStatus.APPROVED,
      },
      where: {
        id: shopId,
      },
    })
  }
)

export default approveShop
