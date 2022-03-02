import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const AddToWishlist = z.object({
  productId: z.number(),
})

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
