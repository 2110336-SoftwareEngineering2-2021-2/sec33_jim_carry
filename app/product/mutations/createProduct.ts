import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateProduct = z.object({
  name: z.string(),
  shopId: z.number(),
  description: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  hidden: z.boolean(),
  images: z.string().array(),
})

export default resolver.pipe(
  resolver.zod(CreateProduct),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const product = await db.product.create({ data: input })

    return product
  }
)
