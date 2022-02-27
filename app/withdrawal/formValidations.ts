import { z } from 'zod'

export const FormWithdrawal = z.object({
  account: z.string().nonempty(),
  amount: z.string().nonempty(),
})
