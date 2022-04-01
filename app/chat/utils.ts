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

export const emojiPattern =
  /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/
