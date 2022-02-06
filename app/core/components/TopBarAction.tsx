import { polymorphic } from "app/core/utils/polymorphic"

export const TopBarAction = polymorphic("button")(function TopBarAction(Box, props) {
  const { className, ...restProps } = props
  return (
    <Box
      className={`
        ${className}
        text-[24px] text-ink-darkest
        -m-2 p-2 rounded-lg
        transition-colors
        hover:bg-sky-light/30 active:bg-sky-light/70
      `}
      {...restProps}
    />
  )
})
