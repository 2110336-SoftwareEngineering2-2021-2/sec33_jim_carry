import { ReactNode } from 'react'

export interface EmptyStateProps {
  icon?: ReactNode
  title?: string
  description?: ReactNode
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-[100px] px-6">
      {icon && <p className="text-[84px] text-ink-darkest">{icon}</p>}
      {title && (
        <p className="text-regular leading-none font-medium text-ink-base">
          {title}
        </p>
      )}
      {description && (
        <p className="text-small leading-tight font-regular text-ink-base">
          {description}
        </p>
      )}
    </div>
  )
}
