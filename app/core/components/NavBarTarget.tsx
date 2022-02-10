import { RouteUrlObject, useRouter } from 'blitz'
import Link from 'next/link'

import { variant } from 'app/core/utils/variant'

export interface NavBarTargetProps {
  to: RouteUrlObject
  title: string
  icon: React.ReactNode
}

export function NavBarTarget({ to, title, icon }: NavBarTargetProps) {
  const router = useRouter()
  const active = router.pathname === to.pathname
  return (
    <Link href={to.pathname ?? '/undefined'} passHref>
      <a
        className={`
          flex-1 h-14 py-2 flex flex-col items-center
          transition-colors hover:bg-sky-light/30 active:bg-sky-light/70
        `}
      >
        <span
          className={`
            text-[24px] mb-1 transition-colors
            ${variant(active, 'text-primary-dark')}
            ${variant(!active, 'text-sky-base')}
          `}
        >
          {icon}
        </span>
        <div
          className={`
            text-tiny leading-none font-regular transition-colors
            ${variant(active, 'text-primary-dark')}
            ${variant(!active, 'text-sky-dark')}
          `}
        >
          {title}
        </div>
      </a>
    </Link>
  )
}
