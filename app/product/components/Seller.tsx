import { Avatar } from 'app/core/components/Avatar'

import { Star } from './Star'

export interface SellerProps {
  name: string
  rating: number
  amount: number
  pic: string | null
}

export function Seller({ name, rating, amount, pic }: SellerProps) {
  const shorten_amount = (amount: number): string => {
    if (amount < 1000) {
      return `${amount}`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`
    } else if (amount >= 10 ** 6) {
      return `${(amount / 10 ** 6).toFixed(1)}M`
    } else {
      return `${amount}`
    }
  }
  return (
    <div className="flex flex-row px-6 py-3 space-x-3">
      <Avatar src={pic} />
      <div className="flex flex-col">
        <p className="text-ink-light">{name}</p>
        <div className="flex flex-row items-center space-x-1">
          <Star rating={rating} />
          <p className="text-tiny text-ink-light">{`${rating} · ${shorten_amount(
            amount
          )} sold`}</p>
        </div>
      </div>
    </div>
  )
}
