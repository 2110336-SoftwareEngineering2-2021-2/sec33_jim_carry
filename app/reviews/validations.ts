import { z } from 'zod'

export const WriteReview = z.object({
  orderId: z.number(),
  reviews: z.array(
    z.object({
      productId: z
        .number()
        .refine((id) => Number.isInteger(id) && id > 0, 'Invalid product id'),
      rating: z
        .number()
        .refine(
          (rating) => Number.isInteger(rating) && rating >= 1 && rating <= 5,
          'Rating must be an integer between 1 and 5'
        ),
      title: z.string().nonempty(),
      comment: z.string(),
    })
  ),
})
