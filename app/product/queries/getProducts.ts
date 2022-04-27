import { NotFoundError, paginate, resolver } from 'blitz'
import db, { Prisma, Shop } from 'db'

interface GetProductsInput
  extends Pick<
    Prisma.ProductFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {}

/**
 * Get products with optional filters
 * @param where - Optional where filter
 * @param orderBy - Optional order by
 * @param skip - Optional skip
 * @param take - Optional take
 * @returns The products with specified filter
 */

const getProducts = resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetProductsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    where = { ...where, hidden: false, stock: { gt: 0 } }
    const {
      items: products,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.product.count({ where }),
      query: (paginateArgs) =>
        db.product.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: { shop: true },
        }),
    })

    return {
      products,
      nextPage,
      hasMore,
      count,
    }
  }
)

export default getProducts
