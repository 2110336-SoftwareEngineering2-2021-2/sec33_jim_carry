import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const SearchProducts = z.object({
  name: z.string(),
  take: z.number(),
  skip: z.number(),
})

export default resolver.pipe(
  resolver.zod(SearchProducts),
  resolver.authorize(),
  async (input) => {
    // Do your stuff :)
    const queries = {
      take: input.take,
      skip: input.skip,
      where: {
        name: {
          contains: input.name,
        },
        hidden: false,
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
        shop: true,
        image: true,
        stock: true,
        price: true,
      },
    }

    return await db.product.findMany(queries)
  }
)
