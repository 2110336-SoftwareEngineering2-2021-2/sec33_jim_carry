import { z } from 'zod'

export const ConfirmCheckout = z.object({
  addressId: z.number(),
  cardId: z.string(),
  itemIds: z.array(z.number()),
})
