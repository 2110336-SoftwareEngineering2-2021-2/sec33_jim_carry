import { format } from 'date-fns'
import { PropsWithChildren } from 'react'

import { variant } from 'app/core/utils/variant'

import { getDateFormat } from '../utils'

export type ChatBubbleProps = PropsWithChildren<{
  isSelf: boolean
  createdAt?: Date
}>

export function ChatBubble({ isSelf, createdAt, children }: ChatBubbleProps) {
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
        `}
      >
        {children}
      </div>
    </div>
  )
}
