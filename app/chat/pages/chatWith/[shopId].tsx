import { BlitzPage, invokeWithMiddleware, Routes } from 'blitz'

import createChat from 'app/chat/mutations/createChat'
import { wrapGetServerSideProps } from 'app/core/utils'

const ChatWithPage: BlitzPage = () => {
  return null
}

export const getServerSideProps = wrapGetServerSideProps(async (context) => {
  const { shopId: _, ...query } = context.query
  const shopId = context.params?.shopId
  const chat = await invokeWithMiddleware(
    createChat,
    parseInt((shopId as string) ?? ''),
    context
  )
  return {
    redirect: {
      destination: Routes.ChatDetailPage({ chatId: chat.id, ...query }),
    },
    props: {},
  }
})

export default ChatWithPage
