import { Message } from '@prisma/client'
import {
  BlitzPage,
  invokeWithMiddleware,
  PromiseReturnType,
  Routes,
  useMutation,
  useRouter,
  useRouterQuery,
} from 'blitz'
import { CSSProperties, Fragment } from 'react'

import { ChatBubble } from 'app/chat/components/ChatBubble'
import { MessageListener } from 'app/chat/components/MessageListener'
import { NewMessageForm } from 'app/chat/components/NewMessageForm'
import { ProductLink } from 'app/chat/components/ProductLink'
import { TypingIndicator } from 'app/chat/components/TypingIndicator'
import { MessageDivider } from 'app/chat/components/message/MessageDivider'
import { MessageItem } from 'app/chat/components/message/MessageItem'
import sendProductLink from 'app/chat/mutations/sendProductLink'
import getChat from 'app/chat/queries/getChat'
import { useChatMessages } from 'app/chat/realtime/client/useChatMessages'
import { useTypingStatus } from 'app/chat/realtime/client/useTypingStatus'
import { getMemberName, isSameGroup } from 'app/chat/utils'
import { TopBar } from 'app/core/components/TopBar'
import { wrapGetServerSideProps } from 'app/core/utils'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

type ChatDetailProps = PromiseReturnType<typeof getChat>

const containerStyles: CSSProperties = {
  height: 'calc(100vh - 153px)',
  maxHeight: 'calc(-webkit-fill-available - 153px)',
}

const dummyMessage: Message = {
  id: 0,
  chatId: 0,
  senderId: 0,
  type: 'TEXT',
  payload: '',
  createdAt: new Date(0),
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

  const { productId } = useRouterQuery()
  const productLinkData = productId ? product : null

  const onBeforeSend = async () => {
    if (!productLinkData) return
    await sendProductLinkMutation({
      chatId: chat.id,
      productId: productLinkData.id,
    })
  }

  const router = useRouter()

  return (
    <>
      <TopBar title={otherName} />
      <div
        style={containerStyles}
        className="flex-1 flex flex-col-reverse overflow-y-scroll"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {messages.map((message, index) => {
            if (index === 0) {
              return null
            }
            const previousMessage = messages[index - 1]!
            const nextMessage = messages[index + 1]
            const groupedWithTop = isSameGroup(message, previousMessage)
            const groupedWithBottom = isSameGroup(nextMessage, message)
            return (
              <Fragment key={message.id}>
                <MessageDivider
                  previousMessage={previousMessage}
                  nextMessage={message}
                />
                <MessageItem
                  userId={userId}
                  message={message}
                  isPreview={false}
                  groupedWithTop={groupedWithTop}
                  groupedWithBottom={groupedWithBottom}
                />
              </Fragment>
            )
          })}
          {othersTyping && (
            <ChatBubble isSelf={false}>
              <TypingIndicator size="large" />
            </ChatBubble>
          )}
          {productLinkData && (
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
                  id: productLinkData.id,
                  name: productLinkData.name,
                  price: productLinkData.price,
                  imageUrl: productLinkData.images[0],
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

export const getServerSideProps = wrapGetServerSideProps<ChatDetailProps>(
  async (context) => {
    const chatId = parseInt((context.params?.chatId as string) ?? '')
    const productId = parseInt((context.query?.productId as string) ?? '')
    const props = await invokeWithMiddleware(
      getChat,
      { chatId, productId: !isNaN(productId) ? productId : undefined },
      context
    )
    props.chat.messages.unshift(dummyMessage)
    return {
      props,
    }
  }
)

setupAuthRedirect(ChatDetailPage)
setupLayout(ChatDetailPage, {
  fillHeight: true,
})

export default ChatDetailPage
