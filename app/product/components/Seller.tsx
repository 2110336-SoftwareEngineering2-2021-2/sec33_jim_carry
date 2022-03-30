import { Avatar } from 'app/core/components/Avatar'
import { Star } from 'app/core/components/Star'
import { shortenAmount } from 'app/core/utils/shortenAmount'

export interface SellerProps {
  name: string
  rating: number | null
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
          <Star rating={rating!} noRating={rating === null} />
          <p className="text-tiny text-ink-light">{`${rating} · ${shortenAmount(
            amount
          )} sold`}</p>
        </div>
      </div>
    </div>
  )
}
