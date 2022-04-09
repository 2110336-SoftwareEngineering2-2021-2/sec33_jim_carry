import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const RemoveFromWishlist = z.object({
  productId: z.number(),
})

/**
 * Remove a product from the current user's wishlist
 */
const removeFromWishlist = resolver.pipe(
  resolver.zod(RemoveFromWishlist),
  resolver.authorize(),
  async ({ productId }, { session }) => {
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

export default removeFromWishlist
