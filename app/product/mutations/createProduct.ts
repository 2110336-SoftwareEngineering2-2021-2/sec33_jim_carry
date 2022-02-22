import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { createUnparsedSourceFile } from 'typescript'
import { z } from 'zod'

const CreateProduct = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  hidden: z.boolean(),
  hashtags: z.string().array(),
  images: z.string().array(),
})

const createProduct = resolver.pipe(
  resolver.zod(CreateProduct),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const product = await db.product.create({
      data: {
        ...input,
        shop: {
          connect: { userId: session.userId },
        },
      },
    })

    return product
  }
)

export default createProduct
