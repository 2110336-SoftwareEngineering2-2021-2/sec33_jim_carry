import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  Link,
  Routes,
  useMutation,
} from 'blitz'
import {
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiMapPin,
  FiTruck,
  FiLayout,
} from 'react-icons/fi'

import logout from 'app/auth/mutations/logout'
import { MenuListItem } from 'app/core/components/MenuListItem'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import getCurrentUser from 'app/users/queries/getCurrentUser'

interface MenuProps {
  user: Awaited<ReturnType<typeof getCurrentUser>>
}

const Menu: BlitzPage<MenuProps> = ({ user }) => {
  const { name, email, profileImage, shop } = user!
  const hasShop = !!shop
  const [logoutMutation] = useMutation(logout)

  return (
    <div className="py-6 flex flex-col gap-[10px]">
      <div className="h-16 px-6 flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-16 h-16 rounded-full bg-sky-base"
          src={profileImage ?? ''}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="w-[calc(100%-80px)]">
          <h3 className="title3 text-ink-darkest whitespace-nowrap overflow-hidden text-ellipsis">
            {name}
          </h3>
          <span className="mt-1 text-regular leading-normal font-regular text-ink-darkest">
            {email}
          </span>
          {/*TODO : Seller Chip*/}
        </div>
      </div>
      <div>
        <Link href={Routes.AddressesPage().pathname} passHref>
          <MenuListItem as="a" icon={<FiMapPin />} title="My addresses" />
        </Link>
        <Link href={Routes.CardsPage().pathname} passHref>
          <MenuListItem as="a" icon={<FiCreditCard />} title="My cards" />
        </Link>
        <Link href={Routes.OrdersPage().pathname} passHref>
          <MenuListItem as="a" icon={<FiTruck />} title="My orders" />
        </Link>
        {hasShop ? (
          <>
            <MenuListItem icon={<FiLayout />} title="My shop" />
            <Link href={Routes.ManageProductsPage().pathname} passHref>
              <MenuListItem as="a" icon={<FiGrid />} title="My products" />
            </Link>
          </>
        ) : (
          <Link href={Routes.RegisterPage().pathname} passHref>
            <MenuListItem as="a" icon={<FiLayout />} title="Register shop" />
          </Link>
        )}
        <MenuListItem icon={<FiHelpCircle />} title="Help" />
      </div>
      <div className="px-6">
        <span className="block w-full h-[1px] bg-sky-lighter" />
      </div>
      <MenuListItem
        onClick={async () => await logoutMutation()}
        title="Logout"
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<MenuProps> = async (
  context
) => {
  const user = await invokeWithMiddleware(getCurrentUser, {}, context)
  return {
    props: { user },
  }
}

setupAuthRedirect(Menu)
Menu.getLayout = (page) => <MainPageLayout title="Menu">{page}</MainPageLayout>

export default Menu
