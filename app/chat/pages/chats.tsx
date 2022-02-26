import { BlitzPage, useQuery } from 'blitz'
import { Suspense } from 'react'

import { ChatList } from 'app/chat/components/ChatList'
import listChats from 'app/chat/queries/listChats'
import { Spinner } from 'app/core/components/Spinner'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'

const Chats: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <ChatListSection />
      </Suspense>
    </main>
  )
}

const ChatListSection = () => {
  const [chats] = useQuery(listChats, { isShopChat: false })
  return <ChatList chats={chats} />
}

setupAuthRedirect(Chats)
Chats.getLayout = (page) => (
  <MainPageLayout title="Chats">{page}</MainPageLayout>
)

export default Chats
