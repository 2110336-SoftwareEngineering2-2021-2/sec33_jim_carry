import {
  AuthorizationError,
  Ctx,
  resolver,
  SESSION_TOKEN_VERSION_0,
} from 'blitz'
import db, { prisma, Prisma } from 'db'
import { z } from 'zod'

export const CreateShop = z.object({
  bio: z.string().optional(),
  phoneNo: z.string().optional(),
  name: z.string(),
  citizenId: z.string(),
  image: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(CreateShop),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const { bio, phoneNo, name, image, citizenId } = input
    const totalSale = 0

    const updateUser = await db.user.update({
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
