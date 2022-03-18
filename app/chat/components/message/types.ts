import { Message } from '@prisma/client'

export interface MessageItemProps {
  userId: number
  message: Message
}
