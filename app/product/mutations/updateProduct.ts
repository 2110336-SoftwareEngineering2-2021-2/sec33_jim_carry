import { resolver } from 'blitz'
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
})

export default resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const product = await db.product.update({ where: { id }, data })

    return product
  }
)
