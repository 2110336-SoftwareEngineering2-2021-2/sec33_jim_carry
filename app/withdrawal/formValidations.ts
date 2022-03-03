import { z } from 'zod'

export const FormWithdrawal = z.object({
  bankAccount: z.string().nonempty(),
  amount: z
    .string()
    .nonempty()
    .transform((value) => Number(value))
    .refine((value) => !Number.isNaN(value), {
      message: 'Amount must be a number',
    })
    .refine((value) => value > 0, {
      message: 'Amount must be positive number',
    }),
})
