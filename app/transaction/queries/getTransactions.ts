import { resolver, NotFoundError, Ctx, AuthorizationError } from 'blitz'
import db from 'db'

/**
 * Get all transactions of the user
 *
 * @returns All transactions in descending order with shop included
 */
const getTransactions = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session: { userId } }: Ctx) => {
    if (!userId) throw new AuthorizationError()
    const transactions = await db.transaction.findMany({
      where: { userId },
      include: {
        Order: {
          include: {
            shop: true,
          },
        },
        bankAccount: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!transactions) throw new NotFoundError()

    return transactions
  }
)

export default getTransactions
