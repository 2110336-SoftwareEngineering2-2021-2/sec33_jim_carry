import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'

import { CreateShop } from '../validations'

export default resolver.pipe(
  resolver.zod(CreateShop),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const { bio, phoneNo, name, image, citizenId } = input
    const totalSale = 0

    const { shop } = await db.user.update({
      where: {
        id: session.userId,
      },
      data: {
        citizenId: citizenId,
        shop: {
          create: {
            bio,
            phoneNo,
            name,
            image,
            totalSale,
          },
        },
      },
      include: { shop: true },
    })
    return shop
  }
)
