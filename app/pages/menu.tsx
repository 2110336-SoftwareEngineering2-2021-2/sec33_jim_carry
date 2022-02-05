import logout from "app/auth/mutations/logout"
import { MenuListItem } from "app/core/components/MenuListItem"
import { MainPageLayout } from "app/core/layouts/MainPageLayout"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { BlitzPage, GetServerSideProps, invokeWithMiddleware, useMutation } from "blitz"
import { FiHelpCircle, FiMapPin } from "react-icons/fi"

interface MenuProps {
  user: Awaited<ReturnType<typeof getCurrentUser>>
}

const Menu: BlitzPage<MenuProps> = ({ user }) => {
  const { name, email } = user!
  const [logoutMutation] = useMutation(logout)
  return (
    <div className="py-6 flex flex-col gap-[10px]">
      <div className="h-16 px-6 flex items-center gap-4">
        <span className="w-16 h-16 rounded-full bg-sky-base" />
        <div className="flex-1">
          <div className="w-full h-7 relative">
            <h3 className="absolute inset-0 title3 text-ink-darkest whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </h3>
          </div>
          <span className="mt-1 text-regular leading-normal font-regular text-ink-darkest">
            {email}
          </span>
        </div>
      </div>
      <div>
        <MenuListItem icon={<FiMapPin />} title="Addresses" />
        <MenuListItem icon={<FiHelpCircle />} title="Help" />
      </div>
      <div className="px-6">
        <span className="block w-full h-[1px] bg-sky-lighter" />
      </div>
      <MenuListItem onClick={async () => await logoutMutation()} title="Logout" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<MenuProps> = async (context) => {
  const user = await invokeWithMiddleware(getCurrentUser, {}, context)
  return {
    props: { user },
  }
}

Menu.authenticate = {
  redirectTo: "/login",
}
Menu.suppressFirstRenderFlicker = true
Menu.getLayout = (page) => <MainPageLayout title="Menu">{page}</MainPageLayout>

export default Menu
