import { Children, cloneElement, useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import { SegmentedControlChildrenProps, SegmentedControlProps, Value } from "./types"

export function SegmentedControl<T extends Value>({
  value,
  onChange,
  children: childrenProp,
}: SegmentedControlProps<T>) {
  const childrenArray = Children.map(childrenProp, (child) => child)
  const count = childrenArray.length

  const finalSelectedIndex = childrenArray.findIndex((child) => child.props.value === value)
  const { animatedIndex } = useSpring({ animatedIndex: finalSelectedIndex })
  const position = animatedIndex.to((idx) => idx / (count - 1))

  const [dragging, setDragging] = useState(false)
  const bind = useDrag(({ down, event }) => {
    setDragging(down)
    const parent = (event.target as HTMLElement).parentElement!
    const bounds = parent.getBoundingClientRect()
    const x = (event as PointerEvent).clientX - bounds.left
    const width = bounds.width
    const newPosition = Math.floor((x / width) * count)
    const clampedPosition = Math.max(0, Math.min(count - 1, newPosition))
    const newChild = childrenArray[clampedPosition]
    if (newChild) {
      onChange(newChild.props.value as T)
    }
  })

  return (
    <div className="w-full h-8 rounded-lg p-0.5 bg-sky-lighter overflow-hidden select-none">
      <div className="w-full h-full relative">
        <animated.span
          className={`absolute left-0 h-full`}
          style={{
            width: `${100 / count}%`,
            transform: animatedIndex.to((idx) => `translateX(${idx * 100}%)`),
          }}
        >
          <animated.span
            className={`
              block w-full h-full rounded-md bg-sky-white shadow transition
              ${dragging ? `scale-95` : ``}
            `}
            style={{
              transformOrigin: position.to(
                (position) => `calc(${position * 100}% + ${14 - 28 * position}px) center`
              ),
            }}
          />
        </animated.span>

        <SegmentedControlChildren
          isDragging={dragging}
          selectedIndex={animatedIndex.to((idx) => Math.round(idx))}
          onChange={onChange}
          childrenArray={childrenArray}
        />

        <animated.span
          className="absolute left-0 h-full touch-none"
          style={{
            width: `${100 / count}%`,
            transform: animatedIndex.to((idx) => `translateX(${idx * 100}%)`),
          }}
          {...bind()}
        />
      </div>
    </div>
  )
}

const SegmentedControlChildren = animated(function SegmentedControlChildren({
  isDragging,
  selectedIndex,
  onChange,
  childrenArray,
}: SegmentedControlChildrenProps) {
  return (
    <ul className="absolute inset-0 flex">
      {childrenArray.map((child, index) => {
        const childProps = child.props
        const isSelected = index === selectedIndex
        return cloneElement(child, {
          position: index / (childrenArray.length - 1),
          isSelected,
          isPressed: isDragging && isSelected,
          onClick: () => onChange(childProps.value),
        })
      })}
    </ul>
  )
})
