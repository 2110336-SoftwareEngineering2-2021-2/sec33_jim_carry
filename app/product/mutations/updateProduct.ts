import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateProduct = z.object({
  id: z.number(),
  name: z.string().optional(),
  shopId: z.number().optional(),
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
  async ({ id, ...data }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const product = await db.product.update({ where: { id }, data })

    return product
  }
)

export default updateProduct
