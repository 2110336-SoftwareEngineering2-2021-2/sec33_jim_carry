import { Button } from 'app/core/components/Button'

export const SearchWithTag = ({ tags, tag, setTag }) => {
  return (
    <div className="flex flex-row overflow-x-auto no-scrollbar mx-6">
      {tags.map((item) => (
        <>
          {item.name != tag && (
            <button
              className="px-4 py-2 bg-sky-lightest rounded-full whitespace-nowrap mx-1 active:scale-95 disabled:active:scale-100"
              key={item.key}
              onClick={() => setTag(item.name)}
            >
              <p className="text-regular leading-none font-regular text-ink-darkest">
                #{item.name}
              </p>
            </button>
          )}
          {item.name == tag && (
            <button
              className="px-4 py-2 bg-sky-light rounded-full whitespace-nowrap mx-1 active:scale-95 disabled:active:scale-100"
              key={item.key}
              onClick={() => setTag('')}
            >
              <p className="text-regular leading-none font-regular text-ink-darkest">
                #{item.name}
              </p>
            </button>
          )}
        </>
      ))}
    </div>
  )
}
