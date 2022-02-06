import { polymorphic } from "app/core/utils/polymorphic"
import { variant } from "../utils/variant"

export interface TopBarActionProps {
  isText?: boolean
}

export const TopBarAction = polymorphic("button")<TopBarActionProps>(function TopBarAction(
  Box,
  props
) {
  const { className, isText = false, ...restProps } = props
  return (
    <Box
      className={`
        ${className}
        ${variant(isText, `text-large leading-none font-medium text-primary-base`)}
        ${variant(!isText, `text-[24px] text-ink-darkest`)}
        -m-2 p-2 rounded-lg
        transition-colors
        hover:bg-sky-light/30 active:bg-sky-light/70
      `}
      {...restProps}
    />
  )
})
