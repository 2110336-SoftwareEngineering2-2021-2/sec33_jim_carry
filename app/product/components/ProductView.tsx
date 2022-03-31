import { Link, Routes, useQuery } from 'blitz'

import countOrders from 'app/order/queries/countSoldOrders'
import ShowReviews from 'app/reviews/components/ShowReviews'
import getReviews from 'app/reviews/queries/getReviews'

import getProduct from '../queries/getProduct'
import { Description } from './Description'
import { FooterButton } from './FooterButton'
import { ProductPicture } from './ProductPicture'
import { ProductTitle } from './ProductTitle'
import { Seller } from './Seller'

export interface ProductViewProps {
  pid: number
}

export function ProductView({ pid }: ProductViewProps) {
  const [product] = useQuery(getProduct, { id: pid })
  const [reviews] = useQuery(getReviews, { by: 'shop', id: product.shopId })
  const [soldCount] = useQuery(countOrders, {
    where: {
      shopId: product.shopId,
      status: { not: 'CANCELLED' },
    },
  })
  const rating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div>
      <ProductPicture imgSrc={product.images} />
      <div className="flex flex-col divide-y divide-sky-lighter">
        <ProductTitle product={product} />
        <Link
          href={Routes.ShopProfilePage({ shopId: product.shopId })}
          passHref
        >
          <a>
            <Seller
              name={product.shop.name}
              rating={rating}
              amount={soldCount}
              pic={product.shop.image}
            />
          </a>
        </Link>
        <Description
          tags={product.hashtags}
          description={product.description ?? ''}
        />
        <ShowReviews productId={pid} />
      </div>
      <FooterButton product={product} />
    </div>
  )
}
