import { useQuery } from 'blitz'
import { Review } from 'db'

import { Star } from 'app/core/components/Star'
import getRating from 'app/reviews/queries/getRating'

interface ShopBioProps {
  shopId: number
  bio: string | null
}

export const ShopBio = ({ shopId, bio }: ShopBioProps) => {
  return (
    <div>
      <div className="text-regular text-ink-darkest">{bio}</div>
      <ShopRating shopId={shopId} />
    </div>
  )
}

interface ShopRatingProps {
  shopId: number
}

const ShopRating = ({ shopId }: ShopRatingProps) => {
  const [{ rating, count }, { isLoading }] = useQuery(getRating, {
    by: 'shop',
    id: shopId,
  })

  if (isLoading) {
    return null
  }

  if (rating === null) {
    return <div className="text-small text-ink-light">No review</div>
  }

  return (
    <div className="mt-1 flex space-x-2 items-center">
      <Star rating={rating} />
      <span className="text-small text-ink-light">
        {`${rating.toFixed(1)} (${count} review${count > 1 ? 's' : ''})`}
      </span>
    </div>
  )
}
