import { BlitzPage } from 'blitz'

import { ChatList } from 'app/chat/components/ChatList'
import { Spinner } from 'app/core/components/Spinner'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'

import { useChatStore } from '../context/useChatStore'

const Chats: BlitzPage = () => {
  const [chats, isLoading] = useChatStore((state) => [
    state.chats,
    state.isLoading,
  ])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <main>
      <ChatList chats={chats} />
    </main>
  )
}

setupAuthRedirect(Chats)
Chats.getLayout = (page) => (
  <MainPageLayout title="Chats">{page}</MainPageLayout>
)

export default Chats
