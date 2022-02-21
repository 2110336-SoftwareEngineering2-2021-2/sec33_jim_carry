import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const AddToShoppingCart = z.object({
  productId: z.number(),
})

const addToShoppingCart = resolver.pipe(
  resolver.zod(AddToShoppingCart),
  resolver.authorize(),
  async ({ productId }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const user = await db.user.update({
      where: {
        id: session.userId,
      },
      data: {
        shoppingCart: {
          connect: { id: productId },
        },
      },
      include: {
        shoppingCart: {
          include: {
            shop: true,
          },
        },
      },
    })

    return user.shoppingCart
  }
)

export default addToShoppingCart
