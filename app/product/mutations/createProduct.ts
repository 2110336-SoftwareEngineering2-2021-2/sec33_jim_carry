import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateProduct = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  hidden: z.boolean(),
  images: z.string().array(),
})

const createProduct = resolver.pipe(
  resolver.zod(CreateProduct),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    const shop = await db.shop.findUnique({
      where: { userId: ctx.session.userId! },
    })
    if (!shop) {
      throw new AuthorizationError('You must have a shop to create new product')
    }
    const product = await db.product.create({
      data: { ...input, shopId: shop.id },
    })

    return product
  }
)

export default createProduct
