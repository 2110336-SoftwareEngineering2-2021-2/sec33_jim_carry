import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const CreateTransaction = z.object({
  name: z.string(),
  amount: z.number(),
  type: z.enum(['WITHDRAW', 'ORDER']),
  userId: z.number(),
  orderId: z.number(),
  bank: z.string().optional(),
  bankAccount: z.string().optional(),
})

const createTransaction = resolver.pipe(
  resolver.zod(CreateTransaction),
  resolver.authorize(),
  async (input, { session: { userId } }: Ctx) => {
    if (!userId) throw new AuthorizationError()
    return await db.transaction.create({ data: input })
  }
)

export default createTransaction
