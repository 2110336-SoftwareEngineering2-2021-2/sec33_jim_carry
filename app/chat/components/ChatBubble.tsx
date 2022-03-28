import { format } from 'date-fns'
import { PropsWithChildren } from 'react'

import { variant } from 'app/core/utils/variant'

import { getDateFormat } from '../utils'

export type ChatBubbleProps = PropsWithChildren<{
  isSelf: boolean
  createdAt?: Date
  groupedWithTop?: boolean
  groupedWithBottom?: boolean
}>

export function ChatBubble({
  isSelf,
  createdAt,
  groupedWithTop = false,
  groupedWithBottom = false,
  children,
}: ChatBubbleProps) {
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
          px-4 py-[10px]
          ${variant(isSelf, `bg-primary-base text-sky-white`)}
          ${variant(!isSelf, `bg-sky-lighter text-ink-darkest`)}
          rounded-[20px]
          ${variant(isSelf && groupedWithTop, `rounded-tr`)}
          ${variant(isSelf && groupedWithBottom, `rounded-br`)}
          ${variant(!isSelf && groupedWithTop, `rounded-tl`)}
          ${variant(!isSelf && groupedWithBottom, `rounded-bl`)}
        `}
      >
        {children}
      </div>
    </div>
  )
}
