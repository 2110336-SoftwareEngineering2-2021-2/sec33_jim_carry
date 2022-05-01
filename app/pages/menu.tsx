import {
  AuthenticationError,
  BlitzPage,
  invokeWithMiddleware,
  Link,
  Routes,
} from 'blitz'
import { ShopStatus, Role } from 'db'
import { AiOutlineShop } from 'react-icons/ai'
import {
  FiCreditCard,
  FiGrid,
  FiMapPin,
  FiTruck,
  FiLayout,
  FiList,
} from 'react-icons/fi'
import { RiFileList3Line } from 'react-icons/ri'

import { Avatar } from 'app/core/components/Avatar'
import { Divider } from 'app/core/components/Divider'
import { MenuListItem } from 'app/core/components/MenuListItem'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { wrapGetServerSideProps } from 'app/core/utils'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import getCurrentUser from 'app/users/queries/getCurrentUser'

interface MenuProps {
  user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>
}

const Menu: BlitzPage<MenuProps> = ({ user }) => {
  const { name, email, profileImage, shop } = user

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
              <Link href={Routes.ShopProfilePage({ shopId: shop.id })} passHref>
                <MenuListItem
                  icon={<AiOutlineShop />}
                  title="My shop profile"
                />
              </Link>
              <Link href={Routes.ShopOrderPage().pathname} passHref>
                <MenuListItem
                  icon={<RiFileList3Line />}
                  title="My shop orders"
                />
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
              <MenuListItem as="div" title="Your request has been declined" />
              <Link href={Routes.RegisterPage().pathname} passHref>
                <MenuListItem
                  as="a"
                  icon={<FiLayout />}
                  title="Register new shop"
                />
              </Link>
            </>
          ) : shop.shopStatus === ShopStatus.REQUESTED ? (
            <MenuListItem as="div" title="Your registration is in progress" />
          ) : null
        ) : (
          <Link href={Routes.RegisterPage().pathname} passHref>
            <MenuListItem as="a" icon={<FiLayout />} title="Register shop" />
          </Link>
        )}
      </div>
      {user.role === Role.ADMIN && (
        <>
          <Divider padded />
          <div>
            <Link href={Routes.AdminTransactionHistory().pathname} passHref>
              <MenuListItem
                as="a"
                icon={<FiLayout />}
                title="Transaction History"
              />
            </Link>
            <Link href={Routes.ApproveShop().pathname} passHref>
              <MenuListItem as="a" icon={<FiLayout />} title="Approve Shop" />
            </Link>
          </div>
        </>
      )}
      <Divider padded />
      <div>
        <Link href={Routes.LogoutPage().pathname} passHref>
          <MenuListItem as="a" title="Logout" />
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps = wrapGetServerSideProps<MenuProps>(
  async (context) => {
    const user = await invokeWithMiddleware(getCurrentUser, {}, context)
    if (!user) {
      throw new AuthenticationError()
    }
    return {
      props: { user },
    }
  }
)

setupAuthRedirect(Menu)
Menu.getLayout = (page) => <MainPageLayout title="Menu">{page}</MainPageLayout>

export default Menu
