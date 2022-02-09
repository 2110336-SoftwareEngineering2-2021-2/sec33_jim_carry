import { FiMic, FiSearch } from "react-icons/fi"

export const SearchBar = () => {
  return (
    <div
      className="
        h-9 px-2 rounded-lg bg-sky-lighter
        flex flex-row items-center gap-3
      "
    >
      <FiSearch />
      <input
        className="
          flex-1 bg-transparent focus:outline-none
          text-regular leading-none font-regular
          text-ink-darkest placeholder:text-ink-light
        "
        placeholder="Search"
      />
      <FiMic />
    </div>
  )
}
