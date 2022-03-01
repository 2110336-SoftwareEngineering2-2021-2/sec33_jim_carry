import { AuthorizationError, Ctx, resolver } from 'blitz'
import db, { TransactionType } from 'db'

import { Withdrawal } from '../validations'

/**
 * Transfer money from the user's Mayday account to the user's bank account
 *
 * @param input - the user's bank account and the amount of money to transfer
 */
const withdraw = resolver.pipe(
  resolver.zod(Withdrawal),
  resolver.authorize(),
  async (input, { session: { userId } }: Ctx) => {
    if (!userId) throw new AuthorizationError()
    const user = await db.user.findFirst({
      where: { id: userId },
      select: { totalBalance: true },
      rejectOnNotFound: true,
    })
    const remains = user.totalBalance - input.amount
    if (remains < 0) {
      throw new Error(`You don't have enough money in your balance`)
    }
    return db.$transaction(async (db) => {
      await db.user.update({
        where: { id: userId },
        data: { totalBalance: remains },
      })
      return await db.transaction.create({
        data: {
          ...input,
          userId,
          type: TransactionType.WITHDRAW,
        },
      })
    })
  }
)

export default withdraw
