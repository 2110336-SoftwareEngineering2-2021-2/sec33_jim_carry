import { resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const SearchProducts = z.object({
  name: z.string(),
  take: z.number(),
  skip: z.number(),
  orderBy: z.enum(['name', 'createdAt', 'price', 'rating']),
  orderType: z.enum(['asc', 'desc']),
  tag: z.string().optional(),
})

/**
 * Search products with a name and a criterion, which is used to specify the output's order (or additionally with a tag of a product)
 *
 * @param input search parameter including name, take, skip, and tag with Order Option including orderBy, and orderType
 *
 * @returns An array of products sorting according to the criterion
 */
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

    const queriesWithoutTag: Prisma.ProductFindManyArgs = {
      take: input.take,
      skip: input.skip,
      where: {
        name: {
          contains: input.name,
          mode: 'insensitive',
        },
        hidden: false,
        stock: { gt: 0 },
      },
      include: {
        shop: true,
      },
      orderBy: order,
    }

    const queriesWithTag: Prisma.ProductFindManyArgs = {
      take: input.take,
      skip: input.skip,
      where: {
        name: {
          contains: input.name,
          mode: 'insensitive',
        },
        hidden: false,
        hashtags: {
          has: input.tag,
        },
        stock: { gt: 0 },
      },
      include: {
        shop: true,
      },
      orderBy: order,
    }

    const queries = input.tag == '' ? queriesWithoutTag : queriesWithTag

    return await db.product.findMany(queries)
  }
)

export default searchProducts
