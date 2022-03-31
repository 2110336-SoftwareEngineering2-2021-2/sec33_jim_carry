import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FiCheck } from 'react-icons/fi'

export interface DropdownlistProps {
  data: string[]
  firstVal: string
  onChange: (value: string) => void
}

export function Dropdownlist({ data, firstVal, onChange }: DropdownlistProps) {
  const [selectedOption, setselectedOption] = useState(firstVal)
  const onChangeHandler = (e: string) => {
    setselectedOption(e)
    onChange(e)
  }
  return (
    <div className="w-fit grow">
      <Listbox value={selectedOption} onChange={onChangeHandler}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-sky-lightest rounded-lg shadow-md">
            <span className="block truncate">{selectedOption}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-sky-lightest rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((month, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active
                        ? 'font-medium bg-primary-lightest text-primary-base'
                        : ''
                    }`
                  }
                  value={month}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? 'font-bold text-primary-dark'
                            : 'font-normal'
                        }`}
                      >
                        {month}
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                        {selected ? (
                          <FiCheck className="stroke-primary-base" />
                        ) : null}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
