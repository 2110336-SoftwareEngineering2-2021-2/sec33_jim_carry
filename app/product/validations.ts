import { z } from 'zod'

// TODO : Require picture
export const CreateProduct = z.object({
  name: z.string().nonempty(),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative(),
  hashtags: z.string().nonempty(),
  description: z.string().optional(),
  // images:
})

export const CreateHashtag = z.object({
  name: z.string().nonempty(),
})
