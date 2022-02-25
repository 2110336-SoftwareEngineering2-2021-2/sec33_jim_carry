import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateProduct = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  soldPrice: z.number().optional(),
  stock: z.number().optional(),
  hidden: z.boolean().optional(),
  images: z.string().array(),
})

const updateProduct = resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, ...data }, ctx: Ctx) => {
    const shop = await db.shop.findUnique({
      where: { userId: ctx.session.userId! },
    })
    if (!shop) {
      throw new AuthorizationError('You must have a shop to update product')
    }
    const product = await db.product.findUnique({ where: { id } })
    if (product?.shopId !== shop.id) {
      throw new AuthorizationError('You do not have access to this product')
    }
    const newProduct = await db.product.update({ where: { id }, data })
    return newProduct
  }
)

export default updateProduct
