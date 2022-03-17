import { Link, Routes, useSession } from 'blitz'

import { Avatar } from 'app/core/components/Avatar'
import { variant } from 'app/core/utils/variant'

import { ChatData } from '../queries/listChats'
import { useChatMessages } from '../realtime/client/useChatMessages'
import { useTypingStatus } from '../realtime/client/useTypingStatus'

export interface ChatListItemProps {
  chat: ChatData
}

export function ChatListItem({ chat }: ChatListItemProps) {
  const { userId } = useSession()
  const otherUser = chat.memberships.find((m) => m.userId !== userId)!.user
  const typings = useTypingStatus(chat.id)
  const messages = useChatMessages(chat.id, chat.messages)
  const lastMessage = messages[messages.length - 1]

  const userMembership = chat.memberships.find((m) => m.userId === userId)
  const isRead = userMembership!.lastMessageReadId === lastMessage?.id

  const othersTyping = typings.some((typingUserId) => typingUserId !== userId)

  return (
    <Link href={Routes.ChatDetailPage({ chatId: chat.id })} passHref>
      <a className="flex flex-row py-4 gap-3 transition-colors hover:bg-sky-light/30 active:bg-sky-light/70">
        <Avatar src={otherUser.shop!.image} size={48} />
        {chat.messages.length > 0 && (
          <>
            <ChatTextPreview
              name={otherUser.shop!.name}
              message={
                othersTyping
                  ? `${otherUser.shop!.name} is typing...`
                  : JSON.stringify(lastMessage?.payload ?? '')
              }
              isRead={isRead}
            />
            <ChatDate date={chat.messages[0]!.createdAt} isRead={isRead} />
          </>
        )}
      </a>
    </Link>
  )
}

interface ChatTextPreviewProps {
  name: string
  message?: string
  isRead?: boolean
}

function ChatTextPreview({
  name,
  message,
  isRead = false,
}: ChatTextPreviewProps) {
  return (
    <div className="flex flex-col w-[calc(100%-132px)]">
      <div className="flex flex-row gap-2 items-center">
        <span
          className={`text-large leading-normal
        ${variant(isRead, 'font-regular text-ink-light')}
        ${variant(!isRead, 'font-bold text-ink-darkest')}
        `}
        >
          {name}
        </span>
        {!isRead && <div className="bg-primary-base w-3 h-3 rounded-full" />}
      </div>
      {message && (
        <span
          className={`text-small leading-normal text-ellipsis overflow-hidden whitespace-nowrap
          ${variant(isRead, 'font-regular text-ink-light')}
          ${variant(!isRead, 'font-bold text-ink-darkest')}
          `}
        >
          {message}
        </span>
      )}
    </div>
  )
}

interface ChatDateProps {
  date: Date
  isRead?: boolean
}

function ChatDate({ date, isRead = false }: ChatDateProps) {
  return (
    <div
      className={`text-small
      ${variant(isRead, 'font-regular text-ink-light')}
      ${variant(!isRead, 'font-bold text-ink-darkest')}
      `}
    >
      {formatDate(date)}
    </div>
  )
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
