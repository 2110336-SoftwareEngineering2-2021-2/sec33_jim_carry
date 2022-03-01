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
    const product = await db.product.deleteMany({ where: { id } })

    return product
  }
)

export default deleteProduct
