import { MainPageLayout } from "app/core/layouts/MainPageLayout"
import { BlitzPage } from "blitz"

const Chats: BlitzPage = () => {
  return <div>Chats</div>
}

Chats.getLayout = (page) => <MainPageLayout title="Chats">{page}</MainPageLayout>

export default Chats
