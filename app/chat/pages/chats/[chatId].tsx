import { Message } from '@prisma/client'
import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'

import { ChatBubble } from 'app/chat/components/ChatBubble'
import { NewMessageForm } from 'app/chat/components/NewMessageForm'
import { TypingIndicator } from 'app/chat/components/TypingIndicator'
import { MessageItem } from 'app/chat/components/message/MessageItem'
import getChat from 'app/chat/queries/getChat'
import { useChatMessages } from 'app/chat/realtime/client/useChatMessages'
import { useTypingStatus } from 'app/chat/realtime/client/useTypingStatus'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

type ChatDetailProps = PromiseReturnType<typeof getChat>

const ChatDetailPage: BlitzPage<ChatDetailProps> = ({ userId, chat }) => {
  const typings = useTypingStatus(chat.id)
  const messages = useChatMessages(chat.id, chat.messages, true)
  const othersTyping = typings.some((typingUserId) => typingUserId !== userId)

  return (
    <div>
      <TopBar title={`Chat ${chat.id}`} />
      <div className="flex flex-col gap-1 mb-4">
        {messages.map((message) => (
          <MessageItem key={message.id} userId={userId} message={message} />
        ))}
        {othersTyping && (
          <ChatBubble isSelf={false}>
            <TypingIndicator size="large" />
          </ChatBubble>
        )}
      </div>
      <NewMessageForm chatId={chat.id} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ChatDetailProps> = async (
  context
) => {
  const chatId = context.params?.chatId
  const props = await invokeWithMiddleware(
    getChat,
    parseInt((chatId as string) ?? ''),
    context
  )
  return {
    props,
  }
}

setupAuthRedirect(ChatDetailPage)
setupLayout(ChatDetailPage)

export default ChatDetailPage
