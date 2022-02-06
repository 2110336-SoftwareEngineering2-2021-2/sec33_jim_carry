import { ReactNode } from "react"
import { FiChevronLeft } from "react-icons/fi"
import { BackButton } from "./BackButton"
import { TopBarAction } from "./TopBarAction"
import { Image } from "blitz"

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

export function TopBar({ onBack, backHref, title, largeTitle, actions }: TopBarProps) {
  const backButton = onBack ? (
    <TopBarAction onClick={onBack}>
      <FiChevronLeft />
    </TopBarAction>
  ) : (
    <TopBarAction as={BackButton} href={backHref}>
      <FiChevronLeft />
    </TopBarAction>
  )

  return (
    <div>
      <div
        className="
          h-14 flex items-center justify-between gap-3 relative
          pl-[18px] pr-6
        "
      >
        {!largeTitle ? (
          <span className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {title ? (
              <h3 className="text-large leading-none font-regular text-ink-darkest">{title}</h3>
            ) : (
              <Image src="/images/logo_horizontal.svg" width={102} height={28} alt="" />
            )}
          </span>
        ) : null}
        {backButton}
        <span className="h-full flex items-center">{actions}</span>
      </div>
      {largeTitle ? <h3 className="px-6 pt-1 pb-3 title2 text-ink-darkest">{title}</h3> : null}
    </div>
  )
}
