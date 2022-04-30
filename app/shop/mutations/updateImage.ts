import { AuthorizationError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateImage = z.object({
  image: z.string().nonempty(),
  shopId: z.number(),
})

/**
 * Update profile image for shop
 *
 * @param input.image The image
 * @param input.shopId The shop's id
 *
 * @returns The updated Shop
 */
const updateImage = resolver.pipe(
  resolver.zod(UpdateImage),
  resolver.authorize(),
  async ({ image, shopId }, { session: { userId } }) => {
    const user = await db.user.findFirst({
      where: { id: userId },
      include: { shop: true },
    })
    if (user?.shop?.id !== shopId) {
      throw new AuthorizationError()
    }
    return db.shop.update({
      data: { image },
      where: { id: shopId },
    })
  }
)

export default updateImage
