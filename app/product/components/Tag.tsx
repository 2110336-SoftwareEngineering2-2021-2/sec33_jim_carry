import { PropsWithChildren } from 'react'

export function Tag({ children }: PropsWithChildren<{}>) {
  return (
    <div className="px-4 py-2 bg-sky-lighter rounded-full whitespace-nowrap">
      <p className="text-regular leading-none font-regular text-ink-darkest">
        {children}
      </p>
    </div>
  )
}
