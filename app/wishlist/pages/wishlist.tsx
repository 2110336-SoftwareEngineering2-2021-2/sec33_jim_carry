import { BlitzPage } from 'blitz'

import { MainPageLayout } from 'app/core/layouts/MainPageLayout'

const Wishlist: BlitzPage = () => {
  return <div>Wishlist</div>
}

Wishlist.getLayout = (page) => (
  <MainPageLayout title="Wishlist">{page}</MainPageLayout>
)

export default Wishlist
