import { resolver, NotFoundError, Ctx, AuthorizationError } from 'blitz'
import db from 'db'

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
      },
    })

    if (!transactions) throw new NotFoundError()

    return transactions
  }
)

export default getTransactions
