import { z } from 'zod'

export const Withdrawal = z.object({
  account: z.string().nonempty(),
  amount: z.string().nonempty(),
})
