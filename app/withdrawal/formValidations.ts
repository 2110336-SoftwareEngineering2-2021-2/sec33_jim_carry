import { z } from 'zod'

export const FormWithdrawal = z.object({
  amount: z.string().nonempty(),
})
