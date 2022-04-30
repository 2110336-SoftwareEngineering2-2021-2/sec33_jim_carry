import { z } from 'zod'

export const Withdrawal = z.object({
  amount: z.number().positive('Must be positive'),
  bankAccountId: z.number(),
})
