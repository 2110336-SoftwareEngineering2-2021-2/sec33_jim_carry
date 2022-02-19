import { RadioGroup } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

import { variant } from 'app/core/utils/variant'

export interface RadioOptionProps<T> {
  className?: string
  value: T
  disabled?: boolean
  children?: ReactNode
}

export function RadioOption<T>({
  className,
  value,
  disabled,
  children,
}: RadioOptionProps<T>) {
  return (
    <RadioGroup.Option
      className={({ active }) => `
        ${className}
        w-full h-11 px-6 flex items-center gap-3
        text-regular leading-tight font-regular text-ink-darkest
        outline-none cursor-pointer transition-colors
        ${variant(!active, 'hover:bg-sky-light/30 active:bg-sky-light/70')}
        ${variant(active, 'bg-sky-light/70')}
      `}
      value={value}
      disabled={disabled}
    >
      {({ checked }) => (
        <Fragment>
          <span
            className={`
          block w-6 h-6 rounded-full
          ring-inset transition
          ${variant(!checked, 'ring-1 ring-sky-base')}
          ${variant(checked, 'ring-8 ring-primary-base')}
        `}
          />
          {children}
        </Fragment>
      )}
    </RadioGroup.Option>
  )
}
