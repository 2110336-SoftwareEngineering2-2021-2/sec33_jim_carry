import { Avatar } from 'app/core/components/Avatar'
import { shortenAmount } from 'app/core/utils/shortenAmount'

import { Star } from './Star'

export interface SellerProps {
  name: string
  rating: number
  amount: number
  pic: string | null
}

export function Seller({ name, rating, amount, pic }: SellerProps) {
  return (
    <div className="flex flex-row px-6 py-3 space-x-3">
      <Avatar src={pic} />
      <div className="flex flex-col">
        <p className="text-ink-light">{name}</p>
        <div className="flex flex-row items-center space-x-1">
          <Star rating={rating} />
          <p className="text-tiny text-ink-light">{`${rating} · ${shortenAmount(
            amount
          )} sold`}</p>
        </div>
      </div>
    </div>
  )
}
