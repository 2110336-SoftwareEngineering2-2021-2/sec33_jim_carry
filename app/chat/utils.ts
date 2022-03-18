import { ChatMember } from '@prisma/client'

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
