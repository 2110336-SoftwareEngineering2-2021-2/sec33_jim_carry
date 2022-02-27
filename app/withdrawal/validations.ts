import { z } from 'zod'

export const Withdrawal = z.object({
  bank: z.string().nonempty(),
  account: z.string().nonempty(),
  amount: z.string().nonempty(),
})
