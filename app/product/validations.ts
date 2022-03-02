import { z } from 'zod'

// TODO : Require picture
export const ProductFormValues = z.object({
  name: z.string().nonempty(),
  price: z.string().nonempty(),
  stock: z.string().nonempty(),
  hashtags: z.string().optional(),
  description: z.string().optional(),
  //images: z.string().array(),
})

export const UpdateProduct = z.object({
  id: z.number(),
  data: ProductFormValues,
})
