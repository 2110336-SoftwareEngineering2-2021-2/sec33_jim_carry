import { ComponentProps } from 'react'
import { FiMic, FiSearch } from 'react-icons/fi'

import { variant } from 'app/core/utils/variant'

export type SearchBarProps = Pick<
  ComponentProps<'input'>,
  'value' | 'onChange' | 'disabled'
>

export const SearchBar = ({
  value,
  onChange,
  disabled = false,
}: SearchBarProps) => {
  return (
    <div
      className="
        h-9 px-2 rounded-lg bg-sky-lighter
        flex flex-row items-center gap-3
      "
    >
      <FiSearch />

      <input
        className={`
          flex-1 bg-transparent focus:outline-none
          text-regular leading-none font-regular
          text-ink-darkest placeholder:text-ink-light
          ${variant(disabled, 'cursor-pointer')}
        `}
        autoFocus
        placeholder="Search"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <FiMic />
    </div>
  )
}
