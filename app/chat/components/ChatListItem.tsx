import { Message } from '@prisma/client'
import { Link, Routes } from 'blitz'

import { Avatar } from 'app/core/components/Avatar'
import { variant } from 'app/core/utils/variant'

import { ChatData } from '../queries/listChats'
import { useChatMessages } from '../realtime/client/useChatMessages'
import { useTypingStatus } from '../realtime/client/useTypingStatus'
import { getMemberName } from '../utils'
import { TypingIndicator } from './TypingIndicator'
import { MessageItem } from './message/MessageItem'

export interface ChatListItemProps {
  userId: number
  chat: ChatData
}

export function ChatListItem({ userId, chat }: ChatListItemProps) {
  const otherMember = chat.memberships.find(
    (member) => member.userId !== userId
  )
  const otherName = getMemberName(otherMember)
  const typings = useTypingStatus(chat.id)
  const messages = useChatMessages(chat.id, chat.messages)
  const lastMessage = messages[messages.length - 1]

  const userMembership = chat.memberships.find((m) => m.userId === userId)
  const isRead = userMembership!.lastMessageReadId === lastMessage?.id

  const othersTyping = typings.some((typingUserId) => typingUserId !== userId)

  const messagePreview = lastMessage && (
    <ChatTextPreview userId={userId} message={lastMessage} isRead={isRead} />
  )

  return (
    <Link href={Routes.ChatDetailPage({ chatId: chat.id })} passHref>
      <a className="flex flex-row py-4 gap-3 transition-colors hover:bg-sky-light/30 active:bg-sky-light/70">
        <Avatar src={otherMember?.user.shop!.image} size={48} />
        <div className="flex flex-col w-[calc(100%-132px)]">
          <div className="flex flex-row gap-2 items-center">
            <span
              className={`
                text-large leading-normal
                ${variant(isRead, 'font-regular text-ink-light')}
                ${variant(!isRead, 'font-bold text-ink-darkest')}
              `}
            >
              {otherName}
            </span>
            {!isRead && (
              <div className="bg-primary-base w-3 h-3 rounded-full" />
            )}
          </div>
          <div className="h-5 flex items-center">
            {othersTyping ? <TypingIndicator /> : messagePreview}
          </div>
        </div>
      </a>
    </Link>
  )
}

interface ChatTextPreviewProps {
  userId: number
  message: Message
  isRead?: boolean
}

function ChatTextPreview({
  userId,
  message,
  isRead = false,
}: ChatTextPreviewProps) {
  return (
    <div
      className={`
        flex items-center gap-1
        text-small leading-normal text-ellipsis overflow-hidden whitespace-nowrap
        ${variant(isRead, 'font-regular text-ink-light')}
        ${variant(!isRead, 'font-bold text-ink-darkest')}
      `}
    >
      <MessageItem userId={userId} message={message} isPreview />
      <ChatDate date={message.createdAt} isRead={isRead} />
    </div>
  )
}

interface ChatDateProps {
  date: Date
  isRead?: boolean
}

function ChatDate({ date, isRead = false }: ChatDateProps) {
  return <span>· {formatDate(date)}</span>
}

function formatDate(date: Date) {
  const now = new Date()
  const diffDays = now.getDate() - date.getDate()
  const diffMonths = now.getMonth() - date.getMonth()
  const diffYears = now.getFullYear() - date.getFullYear()
  // today, use display time instead
  if (diffYears == 0 && diffMonths == 0 && diffDays == 0) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  }
  // yesterday
  if (diffYears == 0 && diffMonths == 0 && diffDays == 1) {
    return 'yesterday'
  }
  // same year
  if (diffYears == 0) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }
  // different year
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
