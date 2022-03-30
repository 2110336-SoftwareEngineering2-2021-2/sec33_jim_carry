import { useQuery } from 'blitz'

import { Star } from 'app/core/components/Star'
import getReviewsByProduct from 'app/reviews/queries/getReviewsByProduct'

interface ProductReviewsProps {
  pid: number
}

export default function ProductReviews({ pid }: ProductReviewsProps) {
  const [reviews] = useQuery(getReviewsByProduct, { productId: pid })
  const avgRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
  const noRating = reviews.length === 0 ? true : false
  return (
    <div className="flex flex-col px-6 divide-y divide-sky-lighter">
      <div className="flex flex-col gap-2 py-4">
        <h4 className="title3 text-ink-darkest">Reviews</h4>
        <div className="flex flex-row items-end gap-2">
          <Star rating={avgRating} noRating={noRating} />
          <p className="text-tiny leading-none font-regular text-ink-darkest">
            {noRating ? 'No Reviews' : `${avgRating}/5`}
          </p>
          <p className="text-tiny leading-none font-regular text-ink-lighter">
            {noRating
              ? null
              : `(${reviews.length} review${reviews.length > 1 ? 's' : ''})`}
          </p>
        </div>
      </div>
      {reviews.map((review) => {
        return (
          <div key={review.id} className="flex flex-col gap-2 py-4">
            <h5 className="text-regular leading-none font-medium text-ink-darkest">
              {review.title}
            </h5>
            <Star rating={review.rating} />
            <p className="text-small leading-normal font-regular text-ink-darkest">
              {review.comment}
            </p>
            <p className="text-tiny leading-normal font-regular text-ink-lighter">
              {`by ${review.user.name}`}
            </p>
          </div>
        )
      })}
    </div>
  )
}
