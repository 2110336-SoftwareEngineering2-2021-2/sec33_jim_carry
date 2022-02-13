import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'

import getWishlist from 'app/wishlist/queries/getWishlist'

/**
 * Clears the sold out items from the wishlist, and returns the updated wishlist
 */
export default resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const wishlist = await getWishlist(null, { session })

    const soldProducts = wishlist
      .filter((product) => product.soldPrice !== null)
      .map((product) => ({
        id: product.id,
      }))

    const user = await db.user.update({
      where: {
        id: session.userId,
      },
      data: {
        wishlist: {
          disconnect: soldProducts,
        },
      },
      include: {
        wishlist: true,
      },
    })

    return user.wishlist
  }
)
