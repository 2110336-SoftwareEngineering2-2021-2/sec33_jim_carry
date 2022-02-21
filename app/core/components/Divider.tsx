import { polymorphic } from '../utils/polymorphic'
import { variant } from '../utils/variant'

export interface DividerProps {
  vertical?: boolean
  full?: boolean
}

export const Divider = polymorphic('span')<DividerProps>(
  (Box, { className, vertical = false, full = true, ...restProps }) => {
    return (
      <div
        className={`
        ${variant(!full && !vertical, 'px-6')}
        ${variant(!full && vertical, 'py-6')}
      `}
      >
        <Box
          className={`
            ${className}
            block bg-sky-light
            ${variant(!vertical, 'w-full h-[1px]')}
            ${variant(vertical, 'h-full w-[1px]')}
          `}
          {...restProps}
        />
      </div>
    )
  }
)
