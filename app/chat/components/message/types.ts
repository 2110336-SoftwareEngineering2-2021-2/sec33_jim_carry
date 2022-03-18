import { Message } from '@prisma/client'

export interface MessageItemProps {
  userId: number
  message: Message
  isPreview?: boolean
}

export interface MessageItemComponentProps {
  userId: number
  isSelf: boolean
  message: Message
}
