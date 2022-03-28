import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  Routes,
} from 'blitz'

import createChat from 'app/chat/mutations/createChat'

const ChatWithPage: BlitzPage = () => {
  return null
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const shopId = context.params?.shopId
  const chat = await invokeWithMiddleware(
    createChat,
    parseInt((shopId as string) ?? ''),
    context
  )
  return {
    redirect: {
      destination: Routes.ChatDetailPage({ chatId: chat.id }),
    },
    props: {},
  }
}

export default ChatWithPage
