import { FiMessageCircle } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

import { ChatData } from '../queries/listChats'
import { ChatListItem } from './ChatListItem'

export interface ChatListProps {
  chats: ChatData[]
  userId: number
}

export function ChatList({ chats, userId }: ChatListProps) {
  if (chats.length == 0) {
    return (
      <EmptyState
        icon={<FiMessageCircle strokeWidth={0.5} size={84} />}
        title="You have no chat session."
        description="When you initiate a conversation with a shop, you will see it here."
      />
    )
  }
  return (
    <div className="flex flex-col pt-2 divide-y divide-sky-lighter">
      {chats.map((chat) => (
        <ChatListItem userId={userId} key={chat.id} chat={chat} />
      ))}
    </div>
  )
}
