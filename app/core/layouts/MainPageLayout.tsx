import { Head, BlitzLayout, Routes } from 'blitz'
import Image from 'next/image'
import {
  FiBell,
  FiHeart,
  FiHome,
  FiMenu,
  FiMessageCircle,
  FiShoppingBag,
} from 'react-icons/fi'

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
  return (
    <>
      <Head>
        <title>{title || 'MayDay'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="sticky top-0 w-full h-[112px] shadow bg-sky-white">
        <Container>
          <div className="w-full h-14 px-6 pl-[22px] flex items-center">
            <Image
              src="/images/logo_horizontal.svg"
              width={102}
              height={28}
              alt="MayDay"
            />
            <span className="flex-1" />
            <TopBarAction>
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
