import { PropsWithChildren } from 'react'

import { variant } from 'app/core/utils/variant'

export type ChatBubbleProps = PropsWithChildren<{
  isSelf: boolean
}>

export function ChatBubble({ isSelf, children }: ChatBubbleProps) {
  return (
    <div
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
