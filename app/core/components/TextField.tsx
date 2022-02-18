import { InputHTMLAttributes, RefAttributes } from 'react'

import { polymorphic } from '../utils/polymorphic'
import { variant } from '../utils/variant'

export interface TextFieldProps {
  fullWidth?: boolean
  floatingLabel?: boolean
  hasError?: boolean
}

export const TextField = polymorphic('input')<TextFieldProps>(
  (Box, props, ref) => {
    const {
      className,
      fullWidth = false,
      floatingLabel = false,
      hasError = false,
      ...restProps
    } = props
    const additionalProps: RefAttributes<HTMLInputElement> &
      InputHTMLAttributes<HTMLInputElement> = {
      ref,
      className: `
      ${className}
      peer
      p-4 h-12 rounded-lg transition
      text-regular leading-none font-regular
      ${variant(
        !hasError,
        `
          ring-1 ring-sky-light
          focus:ring-2 focus:ring-primary-base
        `
      )}
      ${variant(hasError, `ring-2 ring-error`)}
      text-ink-darkest
      focus:outline-none
      disabled:bg-sky-lighter disabled:ring-sky-lighter
      disabled:text-sky-base disabled:placeholder:text-sky-base
      ${variant(fullWidth, `w-full`)}
      ${variant(!floatingLabel, `placeholder:text-ink-lighter`)}
      ${variant(
        floatingLabel,
        `pt-6 placeholder:text-transparent placeholder-shown:pt-4`
      )}
    `,
    }
    return <Box {...additionalProps} {...restProps} />
  }
)

export const FloatingLabel = polymorphic('label')((Box, props) => {
  const { className, ...restProps } = props
  return (
    <Box
      className={`
        ${className}
        absolute left-4 top-2 pointer-events-none
        text-tiny leading-none font-regular text-ink-lighter
        transition-all
        peer-placeholder-shown:text-regular peer-placeholder-shown:top-4
      `}
      {...restProps}
    />
  )
})

export const ErrorMessage = polymorphic('div')((Box, props) => {
  const { className, ...restProps } = props
  return (
    <Box
      className={`
        ${className}
        mt-3
        text-small leading-normal font-regular text-error
      `}
      role="alert"
      {...restProps}
    />
  )
})
