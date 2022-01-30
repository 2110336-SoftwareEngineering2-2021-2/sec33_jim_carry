import { SegmentedControlItemProps } from "./types"

export function SegmentedControlItem({
  onClick,
  position,
  isSelected,
  isPressed,
  children,
}: SegmentedControlItemProps) {
  return (
    <li
      className={`
        flex-1 h-full flex items-center justify-center
        text-tiny leading-none font-medium
        transition
        ${isSelected ? `text-ink-darkest` : `text-ink-light`}
        ${isPressed ? `scale-95` : ``}
      `}
      onClick={onClick}
      style={{
        transformOrigin: `calc(${position! * 100}% + ${14 - 28 * position!}px) center`,
      }}
    >
      {children}
    </li>
  )
}
