import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const AddToWishlist = z.object({
  productId: z.number(),
})

/**
 * Add a product to the current user's wishlist
 */
const addToWishlist = resolver.pipe(
  resolver.zod(AddToWishlist),
  resolver.authorize(),
  async ({ productId }, { session }) => {
    const user = await db.user.update({
      where: {
        id: session.userId,
      },
      data: {
        wishlist: {
          connect: { id: productId },
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

export default addToWishlist
