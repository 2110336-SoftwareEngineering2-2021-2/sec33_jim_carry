import { resolver, NotFoundError } from 'blitz'
import db from 'db'

const getShoppingCart = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }) => {
    const user = await db.user.findFirst({
      where: {
        id: session.userId,
      },
      include: {
        shoppingCart: {
          include: {
            shop: true,
          },
        },
      },
    })

    if (!user) throw new NotFoundError()

    return user.shoppingCart
  }
)

export default getShoppingCart
