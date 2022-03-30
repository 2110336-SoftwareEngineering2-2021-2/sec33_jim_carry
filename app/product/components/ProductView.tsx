import { Link, Routes, useQuery } from 'blitz'

import ShowReviews from 'app/reviews/components/ShowReviews'

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
              rating={product.shop.rating}
              amount={product.shop.totalSale}
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
