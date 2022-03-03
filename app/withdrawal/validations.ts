import { z } from 'zod'

export const Withdrawal = z.object({
  bank: z.string().nonempty(),
  bankAccount: z.string().nonempty(),
  amount: z.number().positive('Must be positive'),
})
