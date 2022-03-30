import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'

import { UpdateProduct } from '../validations'

const updateProduct = resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, data }, { session }: Ctx) => {
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
    if (!product) throw new Error('Update not allowed, product not in shop')

    const compiledInput = { ...data, hidden: false }
    const updatedProduct = await db.product.update({
      where: { id },
      data: compiledInput,
    })

    return updatedProduct
  }
)

export default updateProduct
