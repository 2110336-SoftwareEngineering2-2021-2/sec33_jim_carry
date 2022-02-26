import { AuthorizationError, Ctx, NotFoundError, resolver } from 'blitz'
import db, { TransactionType } from 'db'
import { z } from 'zod'

const CreateWithdraw = z.object({
  amount: z.number(),
  bank: z.string(),
  bankAccount: z.string(),
})

const withdraw = resolver.pipe(
  resolver.zod(CreateWithdraw),
  resolver.authorize(),
  async (input, { session: { userId } }: Ctx) => {
    if (!userId) throw new AuthorizationError()

    const user = await db.user.findFirst({
      where: { id: userId },
      select: { totalBalance: true },
    })
    if (!user) {
      throw new NotFoundError()
    }
    const newBalance = user.totalBalance - input.amount
    if (newBalance < 0) {
      throw new Error(`You don't have enough money in your balance`)
    }
    return await db.$transaction(async (db) => {
      await db.user.update({
        where: { id: userId },
        data: { totalBalance: newBalance },
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
