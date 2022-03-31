import { resolver, NotFoundError, Ctx, AuthorizationError } from 'blitz'
import db from 'db'

/**
 * Get all transactions
 *
 * @returns All transactions
 */

const getAdminTransactions = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const transactions = await db.transaction.findMany({
      include: {
        Order: {
          include: {
            shop: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!transactions) throw new NotFoundError()

    return transactions
  }
)

export default getAdminTransactions
