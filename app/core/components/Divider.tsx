import { polymorphic } from '../utils/polymorphic'
import { variant } from '../utils/variant'

export interface DividerProps {
  dividerColor?: string
  vertical?: boolean
  padded?: boolean
}

export const Divider = polymorphic('span')<DividerProps>(
  (
    Box,
    {
      className,
      dividerColor = 'bg-sky-light',
      vertical = false,
      padded = false,
      ...restProps
    }
  ) => {
    if (padded)
      return (
        <div
          className={`
            ${variant(!vertical, 'px-6')}
            ${variant(vertical, 'py-6')}
          `}
        >
          <Box
            className={`
            ${className}
            block ${dividerColor}
            ${variant(!vertical, 'w-full h-[1px]')}
            ${variant(vertical, 'h-full w-[1px]')}
          `}
            {...restProps}
          />
        </div>
      )
    return (
      <Box
        className={`
        ${className}
        block ${dividerColor}
        ${variant(!vertical, 'w-full h-[1px]')}
        ${variant(vertical, 'h-full w-[1px]')}
      `}
        {...restProps}
      />
    )
  }
)
