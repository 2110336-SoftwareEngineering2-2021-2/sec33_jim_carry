import { NotFoundError, paginate, resolver } from 'blitz'
import db, { Prisma, Shop } from 'db'

interface CountProductsInput
  extends Pick<Prisma.ProductFindManyArgs, 'where'> {}

/**
 * Count all product that satisfies the where condition
 */
const countProducts = resolver.pipe(async ({ where }: CountProductsInput) => {
  where = { ...where, hidden: false }
  const count = db.product.count({ where })
  return count
})

export default countProducts
