import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const DeleteProduct = z.object({
  id: z.number(),
})

const deleteProduct = resolver.pipe(
  resolver.zod(DeleteProduct),
  resolver.authorize(),
  async ({ id }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const user = await db.user.findFirst({
      where: { id: session.userId },
      select: {
        shop: {
          select: { id: true },
        },
      },
    })

    // Find a product with this ID and in this user's shop
    const product = await db.product.findFirst({
      where: { id, shopId: user?.shop?.id },
    })
    if (!product) throw new Error('Deletion not allowed, product not in shop')

    const deletedProduct = await db.product.deleteMany({ where: { id } })

    return deletedProduct
  }
)

export default deleteProduct
