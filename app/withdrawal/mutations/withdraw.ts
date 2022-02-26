import { AuthorizationError, Ctx, NotFoundError, resolver } from 'blitz'
import db from 'db'

import { Withdrawal } from '../validations'

/**
 * Transfer money from the user's Mayday account to the user's bank account
 *
 * @param input - the user's bank account and the amount of money to transfer
 */
const withdraw = resolver.pipe(
  resolver.zod(Withdrawal),
  resolver.authorize(),
  async ({ account, amount }, ctx: Ctx) => {
    if (!ctx.session.userId) throw new AuthorizationError()
    const user = await db.user.findFirst({
      where: { id: ctx.session.userId },
      select: { totalBalance: true },
    })
    if (!user) {
      throw new NotFoundError()
    }
    const balance = user.totalBalance
    const withdraw = Number(amount)
    if (withdraw > balance) {
      throw new Error(
        'Your total balance is less than the amount of money you wish to withdraw'
      )
    }
    if (withdraw <= 0) {
      throw new Error('The amount of money to withdraw must be greater than 0')
    }
    if (isNaN(withdraw)) {
      throw new Error('Please fill in a valid amount to withdraw')
    }

    const remains = balance - withdraw
    await db.user.update({
      where: {
        id: ctx.session.userId,
      },
      data: {
        totalBalance: remains,
      },
    })
  }
)

export default withdraw
