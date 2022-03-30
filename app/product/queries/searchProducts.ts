import { resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const SearchProducts = z.object({
  name: z.string(),
  take: z.number(),
  skip: z.number(),
  orderBy: z.enum(['name', 'createdAt', 'price', 'rating']),
  orderType: z.enum(['asc', 'desc']),
})

const searchProducts = resolver.pipe(
  resolver.zod(SearchProducts),
  async (input) => {
    // Do your stuff :)
    const order: Prisma.ProductOrderByWithRelationInput[] = []

    switch (input.orderBy) {
      case 'name': {
        order.push({ name: input.orderType })
      }
      case 'createdAt': {
        order.push({ createdAt: input.orderType })
      }
      case 'price': {
        order.push({ price: input.orderType })
      }
      case 'rating': {
        order.push({
          shop: {
            rating: input.orderType,
          },
        })
      }
    }

    const queries: Prisma.ProductFindManyArgs = {
      take: input.take,
      skip: input.skip,
      where: {
        name: {
          contains: input.name,
          mode: 'insensitive',
        },
        hidden: false,
      },
      include: {
        shop: true,
      },
      orderBy: order,
    }

    return await db.product.findMany(queries)
  }
)

export default searchProducts
