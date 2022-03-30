import { useQuery } from 'blitz'

import { Spinner } from 'app/core/components/Spinner'
import { Star } from 'app/core/components/Star'
import getReviews from 'app/reviews/queries/getReviews'

interface ShowReviewsByProductProps {
  productId: number
  shopId?: never
}

interface ShowReviewsByShopProps {
  productId?: never
  shopId: number
}

type ShowReviewsProps = ShowReviewsByProductProps | ShowReviewsByShopProps

export default function ShowReviews({ productId, shopId }: ShowReviewsProps) {
  const by = productId ? 'product' : 'shop'
  const id = productId ?? shopId!
  const [reviews, { isLoading }] = useQuery(getReviews, { by, id })

  if (isLoading) return <Spinner />

  const avgRating =
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
  const noRating = reviews.length === 0 ? true : false
  return (
    <div className="flex flex-col px-6 divide-y divide-sky-lighter">
      {productId ? (
        <div className="flex flex-col gap-2 py-4">
          <h4 className="title3 text-ink-darkest">Reviews</h4>
          <div className="flex flex-row items-end gap-2">
            <Star rating={avgRating} noRating={noRating} />
            <p className="text-tiny leading-none font-regular text-ink-darkest">
              {noRating ? 'No reviews' : `${avgRating}/5`}
            </p>
            <p className="text-tiny leading-none font-regular text-ink-lighter">
              {noRating
                ? null
                : `(${reviews.length} review${reviews.length > 1 ? 's' : ''})`}
            </p>
          </div>
        </div>
      ) : null}
      {reviews.map((review) => {
        return (
          <div key={review.id} className="flex flex-col gap-2 py-4">
            <div className="flex flex-col">
              <h5 className="text-regular leading-none font-medium text-ink-darkest">
                {review.title}
              </h5>
              {shopId ? (
                <div className="flex flex-row gap-1">
                  <p className="text-tiny leading-normal font-regular text-ink-lighter">
                    on
                  </p>
                  <p className="text-tiny leading-normal font-bold text-ink-lighter">
                    {review.product.name}
                  </p>
                </div>
              ) : null}
            </div>
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
