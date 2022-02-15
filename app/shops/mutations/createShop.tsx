import { resolver } from 'blitz'
import db, { User, Product } from 'db'
import { z } from 'zod'

const CreateShop = z.object({
  userId: z.number(),
  bio: z.string().optional(),
  phoneNo: z.string().optional(),
  name: z.string(),
  image: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(CreateShop),
  resolver.authorize(),
  async (input) => {
    const { userId, bio, phoneNo, name, image } = input

    // get User from userId
    const user = await db.user.findUnique({
      where: {
        id: input.userId,
      },
    })

    // initiate Array
    const products: Product[] = []
    const followers: User[] = []

    const data = {
      userId,
      user,
      bio,
      phoneNo,
      name,
      image,
      products,
      followers,
    }

    const product = await db.product.create({ data })

    return product
  }
)
