import { Dialog, Transition } from '@headlessui/react'
import { Children, Fragment, ReactNode } from 'react'

import { polymorphic } from '../utils/polymorphic'

export interface PopoverProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Popover({ isOpen, onClose, children }: PopoverProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-ink-darkest/70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="
                inline-block w-[327px] max-w-md my-8 overflow-hidden text-left align-middle
                bg-sky-white shadow-xl rounded-lg
                transition-all transform
              "
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export const PopoverTitle = polymorphic('h1')(
  (Box, { className, ...restProps }) => (
    <Box
      className={`
        ${className}
        title3 text-ink-darkest
      `}
      {...restProps}
    />
  )
)

export const PopoverText = polymorphic('p')(
  (Box, { className, ...restProps }) => (
    <Box
      className={`
        ${className}
        text-regular leading-normal font-regular text-ink-lighter
      `}
      {...restProps}
    />
  )
)
