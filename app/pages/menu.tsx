import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  Link,
  Routes,
  useMutation,
} from 'blitz'
import { ShopStatus } from 'db'
import {
  FiCreditCard,
  FiGrid,
  FiHelpCircle,
  FiMapPin,
  FiTruck,
  FiLayout,
  FiList,
} from 'react-icons/fi'

import logout from 'app/auth/mutations/logout'
import { Avatar } from 'app/core/components/Avatar'
import { Divider } from 'app/core/components/Divider'
import { MenuListItem } from 'app/core/components/MenuListItem'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import getCurrentUser from 'app/users/queries/getCurrentUser'

interface MenuProps {
  user: Awaited<ReturnType<typeof getCurrentUser>>
}

const Menu: BlitzPage<MenuProps> = ({ user }) => {
  const { name, email, profileImage, shop } = user!
  const [logoutMutation] = useMutation(logout)

  return (
    <div className="py-6 flex flex-col gap-[10px]">
      <div className="h-16 px-6 flex items-center gap-4">
        <Avatar src={profileImage} size={64} />
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
      </div>
      <Divider padded />
      <div>
        {shop ? (
          shop.shopStatus === ShopStatus.APPROVED ? (
            <>
              <Link href={Routes.ShopOrderPage().pathname} passHref>
                <MenuListItem icon={<FiLayout />} title="My shop orders" />
              </Link>  
              <Link href={Routes.ManageProductsPage().pathname} passHref>
                <MenuListItem as="a" icon={<FiGrid />} title="My products" />
              </Link>
              <Link href={Routes.TransactionHistory().pathname} passHref>
                <MenuListItem as="a" icon={<FiList />} title="My balance" />
              </Link>
            </>
          ) : shop.shopStatus === ShopStatus.DECLINED ? (
            <>
              <MenuListItem as="a" title="Your request has been declined" />
              <Link href={Routes.RegisterPage().pathname} passHref>
                <MenuListItem
                  as="a"
                  icon={<FiLayout />}
                  title="Register new shop"
                />
              </Link>
            </>
          ) : shop.shopStatus === ShopStatus.REQUESTED ? (
            <MenuListItem as="a" title="Your registration is in progress" />
          ) : null
        ) : (
          <Link href={Routes.RegisterPage().pathname} passHref>
            <MenuListItem as="a" icon={<FiLayout />} title="Register shop" />
          </Link>
        )}
      </div>
      <Divider padded />
      <div>
        <MenuListItem icon={<FiHelpCircle />} title="Help" />
        <Link href={Routes.LogoutPage().pathname} passHref>
          <MenuListItem as="a" title="Logout" />
        </Link>
      </div>
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
