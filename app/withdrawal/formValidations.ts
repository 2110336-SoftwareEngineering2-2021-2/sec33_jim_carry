import { z } from 'zod'

export const FormWithdrawal = z.object({
  bankAccount: z.string().nonempty(),
  amount: z.string().nonempty(),
})
