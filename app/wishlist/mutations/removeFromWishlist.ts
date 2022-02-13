import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const AddToWishlist = z.object({
  productId: z.number(),
})

export default resolver.pipe(
  resolver.zod(AddToWishlist),
  resolver.authorize(),
  async ({ productId }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const user = await db.user.update({
      where: {
        id: session.userId,
      },
      data: {
        wishlist: {
          disconnect: { id: productId },
        },
      },
      include: {
        wishlist: {
          include: {
            shop: true,
          },
        },
      },
    })

    return user.wishlist
  }
)
