import { Review } from 'db'

import { Star } from 'app/core/components/Star'

interface ShopBioProps {
  bio: string | null
  reviews: Review[]
}

export const ShopBio = ({ bio, reviews }: ShopBioProps) => {
  return (
    <div>
      <div className="text-regular text-ink-darkest">{bio}</div>
      <ShopRating reviews={reviews} />
    </div>
  )
}

const ShopRating = ({ reviews }: { reviews: Review[] }) => {
  const avgRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
  const noRating = reviews.length === 0

  if (noRating) {
    return <div className="text-small text-ink-light">No review</div>
  }

  return (
    <div className="mt-1 flex space-x-2 items-center">
      <Star rating={avgRating} />
      <span className="text-small text-ink-light">
        {`${avgRating.toFixed(1)} (${reviews.length} review${
          reviews.length > 1 ? 's' : ''
        })`}
      </span>
    </div>
  )
}
