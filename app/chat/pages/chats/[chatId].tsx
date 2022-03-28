import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
  Routes,
  useMutation,
  useParam,
  useRouter,
  useRouterQuery,
} from 'blitz'
import { CSSProperties } from 'react'

import { ChatBubble } from 'app/chat/components/ChatBubble'
import { MessageListener } from 'app/chat/components/MessageListenerProps'
import { NewMessageForm } from 'app/chat/components/NewMessageForm'
import { ProductLink } from 'app/chat/components/ProductLink'
import { TypingIndicator } from 'app/chat/components/TypingIndicator'
import { MessageItem } from 'app/chat/components/message/MessageItem'
import sendProductLink from 'app/chat/mutations/sendProductLink'
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

const ChatDetailPage: BlitzPage<ChatDetailProps> = ({
  userId,
  chat,
  product,
}) => {
  const typings = useTypingStatus(chat.id)
  const messages = useChatMessages(chat.id, chat.messages, true)
  const otherMember = chat.memberships.find(
    (member) => member.userId !== userId
  )
  const otherName = getMemberName(otherMember) ?? undefined
  const othersTyping = typings.some((typingUserId) => typingUserId !== userId)
  const [sendProductLinkMutation] = useMutation(sendProductLink)

  const onBeforeSend = async () => {
    if (!product) return
    await sendProductLinkMutation({ chatId: chat.id, productId: product.id })
  }

  const { productId } = useRouterQuery()
  const router = useRouter()

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
          {productId && product && (
            <>
              <MessageListener
                chatId={chat.id}
                messageType="PRODUCT_LINK"
                onMessage={() => {
                  router.replace(
                    Routes.ChatDetailPage({ chatId: chat.id }),
                    undefined,
                    { shallow: true }
                  )
                }}
              />
              <ProductLink
                data={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl: product.images[0],
                }}
              />
            </>
          )}
        </div>
      </div>
      <NewMessageForm chatId={chat.id} onBeforeSend={onBeforeSend} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ChatDetailProps> = async (
  context
) => {
  const chatId = parseInt((context.params?.chatId as string) ?? '')
  const productId = parseInt((context.query?.productId as string) ?? '')
  const props = await invokeWithMiddleware(
    getChat,
    { chatId, productId: !isNaN(productId) ? productId : undefined },
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
