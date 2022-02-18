import { PropsWithChildren } from 'react'
import { FiChevronRight } from 'react-icons/fi'

export type SelectSectionProps = PropsWithChildren<{
  sectionName: string
  onClick?: () => void
}>

export function SelectSection({
  sectionName,
  onClick,
  children,
}: SelectSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="mx-6 text-regular leading-none font-medium text-ink-darkest">
        {sectionName}
      </span>
      <div
        onClick={onClick}
        className="
          w-full flex items-center pl-6 pr-[14px] py-2 -my-2 cursor-pointer
          transition-colors
          hover:bg-sky-light/30 active:bg-sky-light/70
        "
      >
        {children}
        <FiChevronRight className="text-[32px]" />
      </div>
    </div>
  )
}
