import { PromiseReturnType } from 'blitz'
import { FiCreditCard } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

import getCards from '../queries/getCards'

export interface CardListProps {
  cards: PromiseReturnType<typeof getCards>
  onDestroyCard: (id: string) => Promise<void>
}

export function CardList({ cards, onDestroyCard }: CardListProps) {
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
            await onDestroyCard(card.id)
          }}
          key={card.id}
          className="
            flex flex-col gap-1 px-6 py-3
            transition-colors
            hover:bg-sky-light/30 active:bg-sky-light/70
          "
        >
          <p className="text-regular leading-tight font-regular text-ink-darkest">
            {card.brand}
            <span className="font-mono">{` •••• ${card.last_digits}`}</span>
          </p>
          <p className="text-small leading-tight font-regular text-ink-lighter">
            {card.name}
          </p>
        </div>
      ))}
    </>
  )
}
