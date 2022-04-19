import { ChatMember, ChatMemberType } from '@prisma/client'
import { BlitzPage, invokeWithMiddleware, PromiseReturnType } from 'blitz'
import { useMemo } from 'react'

import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { wrapGetServerSideProps } from 'app/core/utils'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'

import { ChatList } from '../components/ChatList'
import { SellerChatList } from '../components/SellerChatList'
import listChats from '../queries/listChats'
import { useObserveChat } from '../realtime/client/useObserveChat'

type ChatListProps = PromiseReturnType<typeof listChats>

const ChatListPage: BlitzPage<ChatListProps> = ({ userId, chats, hasShop }) => {
  useObserveChat(chats.map((chat) => chat.id))
  const buyerChats = useMemo(
    () =>
      chats.filter((chat) =>
        matchMemberType(chat.memberships, userId, 'BUYER')
      ),
    [userId, chats]
  )
  const sellerChats = useMemo(
    () =>
      chats.filter((chat) =>
        matchMemberType(chat.memberships, userId, 'SELLER')
      ),
    [userId, chats]
  )
  if (hasShop) {
    return (
      <SellerChatList
        buyerChats={buyerChats}
        sellerChats={sellerChats}
        userId={userId}
      />
    )
  }
  return <ChatList chats={buyerChats} userId={userId} />
}

function matchMemberType(
  members: ChatMember[],
  userId: number,
  type: ChatMemberType
) {
  return members.some(
    (member) => member.userId === userId && member.type === type
  )
}

export const getServerSideProps = wrapGetServerSideProps<ChatListProps>(
  async (context) => {
    const props = await invokeWithMiddleware(listChats, null, context)
    return {
      props,
    }
  }
)

setupAuthRedirect(ChatListPage)
ChatListPage.getLayout = (page) => (
  <MainPageLayout title="Chats">{page}</MainPageLayout>
)

export default ChatListPage
