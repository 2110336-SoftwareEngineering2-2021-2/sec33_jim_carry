import { resolver, NotFoundError, Ctx, AuthorizationError } from 'blitz'
import db from 'db'

export default resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const user = await db.user.findFirst({
      where: {
        id: session.userId,
      },
      include: {
        wishlist: {
          include: {
            shop: true,
          },
        },
      },
    })

    if (!user) throw new NotFoundError()

    return user.wishlist
  }
)
