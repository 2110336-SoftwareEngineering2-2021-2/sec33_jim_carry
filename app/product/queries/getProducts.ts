import { NotFoundError, paginate, resolver } from 'blitz'
import db, { Prisma, Shop } from 'db'

interface GetProductsInput
  extends Pick<
    Prisma.ProductFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProductsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    where = { ...where, hidden: false }
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
        db.product.findMany({ ...paginateArgs, where, orderBy }),
    })

    let shops: Shop[] = []

    products.forEach(async (product) => {
      const shop = await db.shop.findUnique({ where: { id: product.shopId } })
      if (!shop) {
        throw new NotFoundError()
      }
      shops.push(shop)
    })

    return {
      products,
      shops,
      nextPage,
      hasMore,
      count,
    }
  }
)
