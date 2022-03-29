import { resolver } from 'blitz'
import db from 'db'

import { isProductSoldOut } from 'app/core/utils/isProductSoldOut'
import getWishlist from 'app/wishlist/queries/getWishlist'

/**
 * Clears the sold out items from the wishlist, and returns the updated wishlist
 */
const clearSoldOutWishlist = resolver.pipe(
  resolver.authorize(),
  async (_ = null, ctx) => {
    const wishlist = await getWishlist(null, ctx)

    const soldProducts = wishlist
      .filter((product) => isProductSoldOut(product))
      .map((product) => ({
        id: product.id,
      }))

    const user = await db.user.update({
      where: {
        id: ctx.session.userId,
      },
      data: {
        wishlist: {
          disconnect: soldProducts,
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

export default clearSoldOutWishlist
