import { FiArrowDown, FiArrowUp } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'

export const Criteria = ({ order, setOrder, sortBy, setSortBy }) => {
  const Criteria = [
    {
      id: 1,
      type: 'name',
      text: 'Name',
    },
    {
      id: 2,
      type: 'createdAt',
      text: 'Date',
    },
    {
      id: 3,
      type: 'price',
      text: 'Price',
    },
    {
      id: 4,
      type: 'rating',
      text: 'Rating',
    },
  ]
  return (
    <div>
      <div className="flex flex-row">
        {Criteria.map((criterian) => (
          <div key={criterian.id}>
            {order == criterian.type && sortBy === 'asc' && (
              <Button
                buttonType="transparent"
                onClick={() => setSortBy('desc')}
              >
                <p> {criterian.text}</p>
                <div className="ml-1">
                  <FiArrowDown />
                </div>
              </Button>
            )}
            {order == criterian.type && sortBy === 'desc' && (
              <Button buttonType="transparent" onClick={() => setSortBy('asc')}>
                <p>{criterian.text}</p>
                <div className="ml-1">
                  <FiArrowUp />
                </div>
              </Button>
            )}
            {order != criterian.type && (
              <Button
                buttonType="transparent"
                onClick={() => {
                  setOrder(criterian.type)
                  setSortBy('asc')
                }}
              >
                <p className="text-ink-light">{criterian.text}</p>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
