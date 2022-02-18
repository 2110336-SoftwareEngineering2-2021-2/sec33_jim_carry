import { useMutation, useQuery } from 'blitz'
import { FiCreditCard } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

import destroyCard from '../mutations/destroyCard'
import getCards from '../queries/getCards'

export function CardList() {
  const [cards, { refetch }] = useQuery(getCards, null)
  const [destroyCardMutation] = useMutation(destroyCard)

  if (cards.length === 0) {
    return (
      <EmptyState
        icon={<FiCreditCard strokeWidth={0.5} size={84} />}
        title="You don't have a saved card."
        description="Add your cards here for a quicker checkout experience."
      />
    )
  }
  return (
    <>
      {cards.map((card) => (
        <div
          onClick={async () => {
            if (!confirm('Are you sure you want to delete this card?')) return
            await destroyCardMutation(card.id)
            await refetch()
          }}
          key={card.id}
          className="
            flex flex-col gap-1 px-6 py-3
            transition-colors
            hover:bg-sky-light/30 active:bg-sky-light/70
          "
        >
          <p className="text-regular leading-tight font-regular text-ink-darkest">
            {`${card.brand} •••• ${card.last_digits}`}
          </p>
          <p className="text-small leading-tight font-regular text-ink-lighter">
            {card.name}
          </p>
        </div>
      ))}
    </>
  )
}
