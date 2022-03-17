import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'

import { NewMessageForm } from 'app/chat/components/NewMessageForm'
import getChat from 'app/chat/queries/getChat'
import { useChatMessages } from 'app/chat/realtime/client/useChatMessages'
import { useTypingStatus } from 'app/chat/realtime/client/useTypingStatus'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

interface ChatDetailProps {
  chat: PromiseReturnType<typeof getChat>
}

const ChatDetailPage: BlitzPage<ChatDetailProps> = ({ chat }) => {
  const typings = useTypingStatus(chat.id)
  const messages = useChatMessages(chat.id, chat.messages, true)

  return (
    <div>
      <TopBar title={`Chat ${chat.id}`} />
      <p>messages:</p>
      {messages.map((message) => (
        <p key={message.id}>{JSON.stringify(message.payload)}</p>
      ))}
      <p>typing: {JSON.stringify(typings)}</p>
      <NewMessageForm chatId={chat.id} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ChatDetailProps> = async (
  context
) => {
  const chatId = context.params?.chatId
  const chat = await invokeWithMiddleware(
    getChat,
    parseInt((chatId as string) ?? ''),
    context
  )
  return {
    props: { chat },
  }
}

setupAuthRedirect(ChatDetailPage)
setupLayout(ChatDetailPage)

export default ChatDetailPage
