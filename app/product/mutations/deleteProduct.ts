import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteProduct = z.object({
  id: z.number(),
})

const deleteProduct = resolver.pipe(
  resolver.zod(DeleteProduct),
  resolver.authorize(),
  async ({ id }, ctx: Ctx) => {
    const shop = await db.shop.findUnique({
      where: { userId: ctx.session.userId! },
    })
    if (!shop) {
      throw new AuthorizationError('You must have a shop to delete product')
    }
    const product = await db.product.deleteMany({
      where: { id, shopId: shop.id },
    })
    return product
  }
)

export default deleteProduct
