import { z } from 'zod'

// TODO : Require picture
export const CreateProduct = z.object({
  name: z.string().nonempty(),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative().int(),
  hashtags: z.string().optional(),
  description: z.string().optional(),
  // images:
})
