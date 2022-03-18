import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'
import { Suspense } from 'react'
import { FiMessageCircle } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'
import { Spinner } from 'app/core/components/Spinner'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'

import { ChatListItem } from '../components/ChatListItem'
import listChats from '../queries/listChats'
import { useObserveChat } from '../realtime/client/useObserveChat'

type ChatListProps = PromiseReturnType<typeof listChats>

const ChatList: BlitzPage<ChatListProps> = ({ userId, chats }) => {
  useObserveChat(chats.map((chat) => chat.id))
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
    <div className="flex flex-col pt-2 px-6 divide-y divide-sky-lighter">
      {chats.map((chat) => (
        <ChatListItem userId={userId} key={chat.id} chat={chat} />
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ChatListProps> = async (
  context
) => {
  const props = await invokeWithMiddleware(
    listChats,
    { memberType: 'BUYER' },
    context
  )
  return {
    props,
  }
}

setupAuthRedirect(ChatList)
ChatList.getLayout = (page) => (
  <MainPageLayout title="Chats">{page}</MainPageLayout>
)

export default ChatList
