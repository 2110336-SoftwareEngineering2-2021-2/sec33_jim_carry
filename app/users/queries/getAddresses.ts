import { resolver, Ctx, AuthorizationError, NotFoundError } from 'blitz'
import db from 'db'

/**
 * Get the current user's addresses.
 *
 * @returns An array of the user's addresses.
 */
const getAddresses = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const user = await db.user.findFirst({
      where: { id: session.userId },
      select: { addresses: true },
    })
    if (!user) {
      throw new NotFoundError()
    }

    return user.addresses
  }
)

export default getAddresses
