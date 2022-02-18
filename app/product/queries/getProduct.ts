import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetProduct = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

export default resolver.pipe(resolver.zod(GetProduct), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const product = await db.product.findFirst({
    where: { id },
    include: { shop: true },
  })

  if (!product) throw new NotFoundError()

  return product
})
