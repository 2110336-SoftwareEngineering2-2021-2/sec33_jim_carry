import { MainPageLayout } from "app/core/layouts/MainPageLayout"
import { BlitzPage } from "blitz"

const Menu: BlitzPage = () => {
  return <div>Menu</div>
}

Menu.getLayout = (page) => <MainPageLayout title="Menu">{page}</MainPageLayout>

export default Menu
