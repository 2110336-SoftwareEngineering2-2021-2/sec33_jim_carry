import { ChatMember, Message } from '@prisma/client'
import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'
import { CSSProperties } from 'react'

import { ChatBubble } from 'app/chat/components/ChatBubble'
import { NewMessageForm } from 'app/chat/components/NewMessageForm'
import { TypingIndicator } from 'app/chat/components/TypingIndicator'
import { MessageItem } from 'app/chat/components/message/MessageItem'
import getChat from 'app/chat/queries/getChat'
import { useChatMessages } from 'app/chat/realtime/client/useChatMessages'
import { useTypingStatus } from 'app/chat/realtime/client/useTypingStatus'
import { getMemberName } from 'app/chat/utils'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

type ChatDetailProps = PromiseReturnType<typeof getChat>

const containerStyles: CSSProperties = {
  height: 'calc(100vh - 153px)',
  maxHeight: 'calc(-webkit-fill-available - 153px)',
}

const ChatDetailPage: BlitzPage<ChatDetailProps> = ({ userId, chat }) => {
  const typings = useTypingStatus(chat.id)
  const messages = useChatMessages(chat.id, chat.messages, true)
  const otherMember = chat.memberships.find(
    (member) => member.userId !== userId
  )
  const otherName = getMemberName(otherMember) ?? undefined
  const othersTyping = typings.some((typingUserId) => typingUserId !== userId)

  return (
    <>
      <TopBar title={otherName} />
      <div
        style={containerStyles}
        className="flex-1 flex flex-col-reverse overflow-y-scroll"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {messages.map((message) => (
            <MessageItem key={message.id} userId={userId} message={message} />
          ))}
          {othersTyping && (
            <ChatBubble isSelf={false}>
              <TypingIndicator size="large" />
            </ChatBubble>
          )}
        </div>
      </div>
      <NewMessageForm chatId={chat.id} />
    </>
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
setupLayout(ChatDetailPage, {
  fillHeight: true,
})

export default ChatDetailPage
