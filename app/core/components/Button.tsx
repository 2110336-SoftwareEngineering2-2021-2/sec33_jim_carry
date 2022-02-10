import { ReactNode } from 'react'

import { polymorphic } from 'app/core/utils/polymorphic'
import { variant } from 'app/core/utils/variant'

export type ButtonType = 'primary' | 'secondary' | 'outline' | 'transparent'
export type ButtonSize = 'large' | 'small'

export interface ButtonProps {
  buttonType?: ButtonType
  size?: ButtonSize
  fullWidth?: boolean

  iconOnly?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  sideIcon?: ReactNode
}

export const Button = polymorphic('button')<ButtonProps>(function Button(
  Box,
  props
) {
  const {
    className,
    children,
    buttonType = 'primary',
    size = 'large',
    fullWidth = false,
    iconOnly = false,
    leftIcon,
    rightIcon,
    sideIcon,
    ...restProps
  } = props
  return (
    <Box
      className={`
        flex items-center transition
        text-regular leading-none font-medium font-sans
        active:scale-95 disabled:active:scale-100
        ${variant(fullWidth, 'w-full justify-center')}
        ${variant(
          size === 'large',
          `
            h-12 rounded-lg ${variant(!iconOnly, `px-8`)}
            ${variant(!!leftIcon, `pl-4 gap-6`)}
            ${variant(!!rightIcon, `pr-4 gap-6`)}
            ${variant(!!sideIcon, `gap-2`)}
          `
        )}
        ${variant(
          size === 'small',
          `
            h-8 rounded ${variant(!iconOnly, `px-4`)}
            ${variant(!!leftIcon, `pl-2 gap-2`)}
            ${variant(!!rightIcon, `pr-2 gap-2`)}
            ${variant(!!sideIcon, `gap-1`)}
          `
        )}
        ${variant(
          iconOnly,
          `
            justify-center
            ${variant(size === 'large', `w-12`)}
            ${variant(size === 'small', `w-8`)}
          `
        )}
        ${variant(
          buttonType === 'primary',
          `text-sky-white bg-primary-base hover:bg-primary-dark`
        )}
        ${variant(
          buttonType === 'secondary',
          `text-primary-base bg-primary-lightest hover:text-primary-dark hover:bg-primary-lighter`
        )}
        ${variant(
          buttonType === 'outline',
          `text-primary-base ring-inset ring-1 ring-primary-base hover:text-primary-dark hover:ring-primary-dark`
        )}
        ${variant(
          buttonType === 'transparent',
          `text-primary-base hover:bg-primary-lightest`
        )}
        ${variant(
          buttonType === 'primary' || buttonType === 'secondary',
          `disabled:text-sky-dark disabled:bg-sky-light`
        )}
        ${variant(
          buttonType === 'outline' || buttonType === 'transparent',
          `disabled:text-sky-base disabled:ring-sky-base disabled:bg-transparent`
        )}
        ${className ?? ''}
      `}
      {...restProps}
    >
      {wrapIcon(leftIcon, size)}
      {wrapIcon(sideIcon, size)}
      {iconOnly ? wrapIcon(children, size) : children}
      {wrapIcon(rightIcon, size)}
    </Box>
  )
})

function wrapIcon(
  icon: ReactNode | undefined,
  size: ButtonSize
): ReactNode | undefined {
  if (!icon) return undefined
  return (
    <span className={size === 'large' ? `text-[24px]` : `text-[16px]`}>
      {icon}
    </span>
  )
}
