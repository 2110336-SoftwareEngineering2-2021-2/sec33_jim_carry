import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const GetShop = z.object({
  id: z.number().optional().refine(Boolean, 'Required'),
})

const getShop = resolver.pipe(
  resolver.zod(GetShop),
  resolver.authorize(),
  async ({ id }) => {
    const shop = await db.shop.findFirst({
      where: { id },
      include: {
        products: true,
        reviews: true,
        _count: {
          select: {
            followers: true,
          },
        },
      },
    })

    if (!shop) throw new NotFoundError()

    return shop
  }
)

export default getShop
