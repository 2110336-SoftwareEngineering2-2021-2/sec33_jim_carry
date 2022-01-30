import { PropsWithChildren, ReactElement } from "react"

export type Value = string | number

export type SegmentedControlProps<T extends Value> = {
  value: T
  onChange: (value: T) => void
  children: ReactElement<SegmentedControlItemProps> | ReactElement<SegmentedControlItemProps>[]
}

export type SegmentedControlChildrenProps = {
  isDragging: boolean
  selectedIndex: number
  onChange: (value: Value) => void
  childrenArray: ReactElement<SegmentedControlItemProps>[]
}

export type SegmentedControlItemProps = PropsWithChildren<{
  value: Value

  onClick?: () => void
  position?: number
  isSelected?: boolean
  isPressed?: boolean
}>
