import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetShop = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
})

/**
 * Get shop by id
 *
 * @param id - shopId (Required at runtime)
 * @returns The shop with specified id
 */

const getShop = resolver.pipe(resolver.zod(GetShop), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const shop = await db.shop.findFirst({ where: { id } })

  if (!shop) throw new NotFoundError()

  return shop
})

export default getShop
