import { z } from 'zod'

export const SendMessageForm = z.object({
  message: z.string(),
})

export const SendTextMessage = z.object({
  chatId: z.number(),
  message: z.string(),
})

export const MarkAsRead = z.object({
  chatId: z.number(),
  messageId: z.number(),
})
