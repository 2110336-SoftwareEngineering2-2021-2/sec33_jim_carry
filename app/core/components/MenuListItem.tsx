import { ReactNode } from "react"
import { polymorphic } from "../utils/polymorphic"

interface MenuListItemProps {
  icon?: ReactNode
  title: string
}

export const MenuListItem = polymorphic<MenuListItemProps, "button">(
  "button",
  function MenuListItem(Box, { className, icon, title, ...restProps }) {
    return (
      <Box
        className={`
          ${className}
          w-full h-14 px-6 flex items-center gap-3 text-ink-darkest
          transition-colors
          hover:bg-sky-light/30 active:bg-sky-light/70
        `}
        {...restProps}
      >
        {icon ? <span className="text-[24px]">{icon}</span> : null}
        <span className="text-regular leading-tight font-regular">{title}</span>
      </Box>
    )
  }
)
