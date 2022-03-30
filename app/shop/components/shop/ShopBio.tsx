import { Star } from 'app/core/components/Star'

interface ShopBioProps {
  bio: string | null
  rating: number | null
}

export const ShopBio = ({ bio, rating }: ShopBioProps) => {
  return (
    <div>
      <div className="text-regular text-ink-darkest">{bio}</div>
      <div className="mt-1 flex space-x-2 items-center">
        <Star rating={rating!} noRating={!rating} />
        <span className="text-small text-ink-light">{rating?.toFixed(1)}</span>
      </div>
    </div>
  )
}
