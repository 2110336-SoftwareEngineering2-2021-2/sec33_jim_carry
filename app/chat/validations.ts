import { z } from 'zod'

export const GetChat = z.object({
  chatId: z.number(),
  productId: z.number().optional(),
})
