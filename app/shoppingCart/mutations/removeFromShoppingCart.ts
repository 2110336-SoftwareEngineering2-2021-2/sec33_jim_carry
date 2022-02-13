import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const RemoveFromShoppingCart = z.object({
  productId: z.number(),
})

export default resolver.pipe(
  resolver.zod(RemoveFromShoppingCart),
  resolver.authorize(),
  async ({ productId }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const user = await db.user.update({
      where: {
        id: session.userId,
      },
      data: {
        shoppingCart: {
          disconnect: { id: productId },
        },
      },
      include: {
        shoppingCart: true,
      },
    })

    return user.shoppingCart
  }
)
