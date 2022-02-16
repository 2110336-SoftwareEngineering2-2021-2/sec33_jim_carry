import { AuthorizationError, Ctx, resolver } from 'blitz'
import db, { Prisma } from 'db'

import { CreateShop } from '../validations'

export default resolver.pipe(
  resolver.zod(CreateShop),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const { bio, phoneNo, name, image, citizenId } = input
    const totalSale = 0

    await db.user.update({
      where: {
        id: session.userId,
      },
      data: {
        citizenId: citizenId,
      },
    })

    const data: Prisma.ShopCreateInput = {
      user: {
        connect: {
          id: session.userId,
        },
      },
      bio,
      phoneNo,
      name,
      image,
      totalSale,
    }

    return await db.shop.create({ data })
  }
)
