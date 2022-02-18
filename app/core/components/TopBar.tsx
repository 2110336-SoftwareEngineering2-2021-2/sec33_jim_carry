import { Image } from 'blitz'
import { ReactNode } from 'react'
import { FiChevronLeft } from 'react-icons/fi'

import { BackButton } from './BackButton'
import { TopBarAction } from './TopBarAction'

export type TopBarProps = {
  actions?: ReactNode
} & (WithTitle | WithoutTitle) &
  (WithBackOnClick | WithBackHref)

type WithTitle = {
  title: string
  largeTitle?: boolean
}
type WithoutTitle = {
  title?: never
  largeTitle?: false
}

type WithBackOnClick = {
  onBack?: () => void
  backHref?: never
}
type WithBackHref = {
  onBack?: never
  backHref?: string
}

export function TopBar({
  onBack,
  backHref,
  title,
  largeTitle,
  actions,
}: TopBarProps) {
  const backButton = onBack ? (
    <TopBarAction onClick={onBack}>
      <FiChevronLeft />
    </TopBarAction>
  ) : (
    <TopBarAction as={BackButton} href={backHref}>
      <FiChevronLeft />
    </TopBarAction>
  )
  const actionsContainer = (
    <span className="h-full flex items-center">{actions}</span>
  )

  return (
    <div className="sticky top-0 bg-sky-white z-50">
      <div
        className="
          h-14 flex items-center justify-between gap-3 relative
          pl-[18px] pr-6
        "
      >
        {!largeTitle ? (
          <span className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {title ? (
              <h3 className="text-large leading-none font-regular text-ink-darkest">
                {title}
              </h3>
            ) : (
              <Image
                src="/images/logo_horizontal.svg"
                width={102}
                height={28}
                alt=""
              />
            )}
          </span>
        ) : null}
        {backButton}
        {!largeTitle ? actionsContainer : null}
      </div>
      {largeTitle ? (
        <div className="flex px-6 pt-1 pb-3 items-center justify-between">
          <h3 className="title2 text-ink-darkest">{title}</h3>
          {actionsContainer}
        </div>
      ) : null}
    </div>
  )
}
