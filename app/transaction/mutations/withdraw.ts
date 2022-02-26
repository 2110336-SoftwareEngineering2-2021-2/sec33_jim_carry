import { AuthorizationError, Ctx, NotFoundError, resolver } from 'blitz'
import db, { TransactionType } from 'db'
import { z } from 'zod'

const CreateWithdraw = z.object({
  amount: z.number(),
  bank: z.string().optional(),
  bankAccount: z.string().nonempty(),
})

const withdraw = resolver.pipe(
  resolver.zod(CreateWithdraw),
  resolver.authorize(),
  async (input, { session: { userId } }: Ctx) => {
    if (!userId) throw new AuthorizationError()
    return await db.$transaction(async (db) => {
      const user = await db.user.findFirst({
        where: { id: userId },
        select: { totalBalance: true },
        rejectOnNotFound: true,
      })
      const newBalance = user.totalBalance - input.amount
      if (newBalance < 0) {
        throw new Error(`You don't have enough money in your balance`)
      }
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
