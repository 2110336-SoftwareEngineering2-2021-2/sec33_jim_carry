import { Link, Routes } from 'blitz'
import { Router } from 'next/dist/client/router'
import { FiMic, FiSearch } from 'react-icons/fi'

export const SearchBar = ({ setText }) => {
  return (
    <div
      className="
        h-9 px-2 rounded-lg bg-sky-lighter
        flex flex-row items-center gap-3
      "
    >
      <FiSearch />

      <Link href={Routes.Search().pathname} passHref>
        <input
          className="
          flex-1 bg-transparent focus:outline-none
          text-regular leading-none font-regular
          text-ink-darkest placeholder:text-ink-light 
          "
          autoFocus
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
        />
      </Link>
      <FiMic />
    </div>
  )
}
