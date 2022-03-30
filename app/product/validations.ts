import { z } from 'zod'

export const ProductFormValues = z.object({
  name: z.string().nonempty(),
  price: z
    .string()
    .nonempty()
    .transform((str) => parseFloat(str))
    .refine((val) => !isNaN(val), {
      message: 'Price must be a number',
    })
    .refine((val) => val >= 0, {
      message: 'Price cannot be negative',
    }),
  stock: z
    .string()
    .nonempty()
    .transform((str) => parseInt(str))
    .refine((val) => !isNaN(val), {
      message: 'Stock must be an integer',
    })
    .refine((val) => val >= 0, {
      message: 'Stock cannot be negative',
    }),
  hashtags: z
    .string()
    .optional()
    .transform((str) => (str ? str.split(',').map((s) => s.trim()) : [])),
  description: z.string().optional(),
  images: z.string().array().nonempty({
    message: 'At least 1 product image is required',
  }),
})

export const TransformedProductFormValues = z.object({
  name: z.string().nonempty(),
  price: z.number(),
  stock: z.number(),
  hashtags: z.string().array(),
  description: z.string().optional(),
  images: z.string().array().nonempty(),
})

export const UpdateProduct = z.object({
  id: z.number(),
  data: ProductFormValues,
})
