import { useQuery } from 'blitz'

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
  console.log(product)

  return (
    <div>
      <ProductPicture imgSrc={product.images} />
      <div className="flex flex-col divide-y divide-sky-lighter">
        <ProductTitle product={product} />
        <Seller
          name={product.shop.name}
          rating={product.shop.rating ?? 5}
          amount={product.shop.totalSale}
          pic={product.shop.image}
        />
        <Description
          tags={['Addidas', 'SDKfjl']}
          description={product.description ?? ''}
        />
      </div>
      <FooterButton pid={pid} />
    </div>
  )
}
