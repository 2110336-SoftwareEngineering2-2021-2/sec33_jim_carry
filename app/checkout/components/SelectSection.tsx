import { RadioGroup } from '@headlessui/react'
import { Link } from 'blitz'
import { ReactNode } from 'react'
import { FiChevronRight, FiPlus } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { Popover, PopoverText, PopoverTitle } from 'app/core/components/Popover'
import { RadioOption } from 'app/core/components/RadioOption'
import { useDisclosure } from 'app/core/utils/useDisclosure'

export interface SelectSectionProps<T, K> {
  sectionName: string
  items: T[]
  value: K
  onChange: (value: K) => void
  children: (item: T) => ReactNode
  title: string
  description: string
  getLabel: (item: T) => string
  addText: string
  addLink: string
}

export function SelectSection<T extends { id: K }, K>({
  sectionName,
  items,
  value,
  onChange,
  children,
  title,
  description,
  getLabel,
  addText,
  addLink,
}: SelectSectionProps<T, K>) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const selectedItem = items.find((item) => item.id === value)

  return (
    <>
      <div className="flex flex-col gap-3">
        <span className="mx-6 text-regular leading-none font-medium text-ink-darkest">
          {sectionName}
        </span>
        <div
          onClick={onOpen}
          className="
            w-full flex items-center pl-6 pr-[14px] py-2 -my-2 cursor-pointer
            transition-colors
            hover:bg-sky-light/30 active:bg-sky-light/70
          "
        >
          {selectedItem ? (
            children(selectedItem)
          ) : (
            <span className="flex-1">{addText}</span>
          )}
          <FiChevronRight className="text-[32px]" />
        </div>
      </div>
      <Popover isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col items-center py-6 gap-6">
          <div className="flex flex-col px-6 gap-2 text-center">
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverText>{description}</PopoverText>
          </div>
          <RadioGroup
            className="w-full"
            value={value}
            onChange={(newValue) => {
              onChange(newValue)
              onClose()
            }}
          >
            {items.map((item) => (
              <RadioOption key={item.id as unknown as string} value={item.id}>
                {getLabel(item)}
              </RadioOption>
            ))}
            <Link href={addLink} passHref>
              <a
                className="
                  w-full h-11 flex items-center px-6 gap-3
                  text-regular leading-tight font-regular text-ink-darkest
                  hover:bg-sky-light/30 active:bg-sky-light/70
                "
              >
                <FiPlus className="text-[24px]" />
                {addText}
              </a>
            </Link>
          </RadioGroup>
          <div className="w-full px-6">
            <Button buttonType="transparent" fullWidth>
              Cancel
            </Button>
          </div>
        </div>
      </Popover>
    </>
  )
}
