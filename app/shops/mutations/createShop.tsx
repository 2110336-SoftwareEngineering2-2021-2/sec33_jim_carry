import { AuthorizationError, Ctx, resolver } from 'blitz'
import db, { Prisma } from 'db'
import { z } from 'zod'

const CreateShop = z.object({
  bio: z.string().optional(),
  phoneNo: z.string().optional(),
  name: z.string(),
  image: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(CreateShop),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const { bio, phoneNo, name, image } = input
    const totalSale = 0

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
