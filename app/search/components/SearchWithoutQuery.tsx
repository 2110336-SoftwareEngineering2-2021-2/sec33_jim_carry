import { FiSearch } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

export const SearchWithoutQuery = () => {
  return (
    <div className="mt-40">
      <EmptyState
        icon={<FiSearch strokeWidth={0.5} size={84} />}
        title={`Type to begin searching`}
      />
    </div>
  )
}
