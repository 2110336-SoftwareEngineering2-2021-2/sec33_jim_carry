import { variant } from 'app/core/utils/variant'

export interface TypingIndicatorProps {
  size?: 'small' | 'large'
}

const animationNames = [
  'animate-typing-indicator-1',
  'animate-typing-indicator-2',
  'animate-typing-indicator-3',
]

export function TypingIndicator({ size = 'small' }: TypingIndicatorProps) {
  return (
    <div
      className={`
        flex gap-0.5
        ${variant(size === 'small', `gap-0.5`)}
        ${variant(size === 'large', `gap-1`)}
      `}
    >
      {animationNames.map((animationName, index) => (
        <span
          key={index}
          className={`
            block
            ${variant(size === 'small', `w-2 h-2`)}
            ${variant(size === 'large', `w-3 h-3`)}
            rounded-full opacity-40 bg-ink-dark ${animationName}
          `}
        />
      ))}
    </div>
  )
}
