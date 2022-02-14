import { Head, BlitzLayout, Routes, useRouter } from 'blitz'
import Image from 'next/image'
import {
  FiBell,
  FiHeart,
  FiHome,
  FiMenu,
  FiMessageCircle,
  FiShoppingBag,
} from 'react-icons/fi'

import { useShoppingCartStore } from 'app/shoppingCart/context/useShoppingCartStore'

import { Container } from '../components/Container'
import { NavBarTarget } from '../components/NavBarTarget'
import { TopBarAction } from '../components/TopBarAction'

interface MainPageLayoutProps {
  title: string
}

export const MainPageLayout: BlitzLayout<MainPageLayoutProps> = ({
  title,
  children,
}) => {
  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart)
  const count = shoppingCart.length
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{title || 'MayDay'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="sticky top-0 w-full h-[112px] shadow bg-sky-white z-50">
        <Container>
          <div className="w-full h-14 px-6 pl-[22px] flex items-center">
            <Image
              src="/images/logo_horizontal.svg"
              width={102}
              height={28}
              alt="MayDay"
            />
            <span className="flex-1" />
            <TopBarAction
              onClick={() => router.push(Routes.ShoppingCart())}
              className="relative inline-block"
            >
              {!!count && (
                <span
                  className="absolute top-0 right-0 px-1.5 py-0.5
                   text-tiny text-sky-white bg-error rounded-full"
                >
                  {count}
                </span>
              )}
              <FiShoppingBag />
            </TopBarAction>
          </div>
          <div className="flex">
            <NavBarTarget to={Routes.Home()} title="Home" icon={<FiHome />} />
            <NavBarTarget
              to={Routes.Wishlist()}
              title="Wishlist"
              icon={<FiHeart />}
            />
            <NavBarTarget
              to={Routes.Chats()}
              title="Chats"
              icon={<FiMessageCircle />}
            />
            <NavBarTarget
              to={Routes.Notifications()}
              title="Notifications"
              icon={<FiBell />}
            />
            <NavBarTarget to={Routes.Menu()} title="Menu" icon={<FiMenu />} />
          </div>
        </Container>
      </div>
      <Container>{children}</Container>
    </>
  )
}
