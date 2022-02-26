import { resolver, Ctx, AuthorizationError, NotFoundError } from 'blitz'
import db from 'db'

/**
 * Get the current user's total balance.
 *
 * @returns An integer of the user's total balance.
 */
const getBalance = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const user = await db.user.findFirst({
      where: { id: session.userId },
      select: { totalBalance: true },
    })
    if (!user) {
      throw new NotFoundError()
    }

    return user.totalBalance
  }
)

export default getBalance
