import { polymorphic } from '../utils/polymorphic'
import { variant } from '../utils/variant'

export interface DividerProps {
  vertical?: boolean
}

export const Divider = polymorphic('span')<DividerProps>(
  (Box, { className, vertical = false, ...restProps }) => {
    return (
      <Box
        className={`
          ${className}
          block bg-sky-light
          ${variant(!vertical, 'w-full h-[1px]')}
          ${variant(vertical, 'h-full w-[1px]')}
        `}
        {...restProps}
      />
    )
  }
)
