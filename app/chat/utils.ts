import { ChatMember, Message } from '@prisma/client'
import { differenceInMinutes, isSameDay, isSameYear } from 'date-fns'

type ChatMemberWithName = ChatMember & {
  user: {
    name: string | null
    shop: { name: string | null } | null
  }
}

export function getMemberName(member?: ChatMemberWithName) {
  if (member?.type === 'BUYER') return member.user.name
  if (member?.type === 'SELLER') return member.user.shop!.name
  if (member?.type === 'ADMIN') return 'Admin'
  if (!member) return null
}

export function getDateFormat(date: Date) {
  const now = new Date()
  const showDate = !isSameDay(date, now)
  const showYear = !isSameYear(date, now)
  const dateFormat = showYear ? 'MMM d yyyy' : 'MMM d'
  return `${showDate ? `${dateFormat}, ` : ''}h:mm a`
}

export function isSameGroup(message?: Message, previousMessage?: Message) {
  if (!message || !previousMessage) return false
  const minutes = differenceInMinutes(
    message.createdAt,
    previousMessage.createdAt
  )
  if (minutes >= 3) return false
  if (message.senderId !== previousMessage.senderId) return false
  if (message.type !== previousMessage.type) return false
  return true
}
