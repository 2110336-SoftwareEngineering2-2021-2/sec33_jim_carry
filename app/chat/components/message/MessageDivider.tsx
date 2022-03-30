import { Message } from '@prisma/client'
import { differenceInMinutes, format } from 'date-fns'

import { getDateFormat } from 'app/chat/utils'

export interface MessageDividerProps {
  previousMessage: Message
  nextMessage: Message
}

export function MessageDivider({
  previousMessage,
  nextMessage,
}: MessageDividerProps) {
  const minutes = differenceInMinutes(
    nextMessage.createdAt,
    previousMessage.createdAt
  )
  if (minutes < 3) return null
  return (
    <div className="w-full h-[30px] flex items-center justify-center">
      <span className="text-small leading-none font-regular text-sky-dark">
        {format(nextMessage.createdAt, getDateFormat(nextMessage.createdAt))}
      </span>
    </div>
  )
}
