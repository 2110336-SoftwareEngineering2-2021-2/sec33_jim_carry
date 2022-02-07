import { BlitzPage } from "blitz"

import { MainPageLayout } from "app/core/layouts/MainPageLayout"

const Chats: BlitzPage = () => {
  return <div>Chats</div>
}

Chats.getLayout = (page) => <MainPageLayout title="Chats">{page}</MainPageLayout>

export default Chats
