import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export const CreateBankAccount = z.object({
  bank: z.string().nonempty(),
  name: z.string().nonempty(),
  number: z.string().nonempty(),
})

/**
 * Create a new bank account for the current user.
 *
 * @param input - The bank account to create.
 */
const createBankAccount = resolver.pipe(
  resolver.zod(CreateBankAccount),
  resolver.authorize(),
  async (bankAccount, { session: { userId } }) => {
    await db.bankAccount.create({
      data: {
        ...bankAccount,
        userId,
      },
    })
  }
)

export default createBankAccount
