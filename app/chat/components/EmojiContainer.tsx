import { format } from 'date-fns'
import { PropsWithChildren } from 'react'

import { variant } from 'app/core/utils/variant'

import { getDateFormat } from '../utils'

export type EmojiContainerProps = PropsWithChildren<{
  isSelf: boolean
  createdAt?: Date
}>

export function EmojiContainer({
  isSelf,
  createdAt,
  children,
}: EmojiContainerProps) {
  const title = createdAt
    ? format(createdAt, getDateFormat(createdAt))
    : undefined
  return (
    <div
      title={title}
      className={`
        flex
        ${variant(isSelf, `justify-end`)}
        ${variant(!isSelf, `justify-start`)}
      `}
    >
      <div
        className={`
          text-[44px] text-ink-darkest
        `}
      >
        {children}
      </div>
    </div>
  )
}
