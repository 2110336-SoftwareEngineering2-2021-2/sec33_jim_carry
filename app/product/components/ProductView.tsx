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
      <ProductPicture
        imgSrc={[
          'https://i.pinimg.com/736x/e6/94/24/e69424dbee0c631d16e9388cd7c872a6--running-shoes-sale-nike-free-shoes.jpg',
          'https://i.pinimg.com/736x/e6/94/24/e69424dbee0c631d16e9388cd7c872a6--running-shoes-sale-nike-free-shoes.jpg',
          'https://i.pinimg.com/736x/e6/94/24/e69424dbee0c631d16e9388cd7c872a6--running-shoes-sale-nike-free-shoes.jpg',
          'https://i.pinimg.com/736x/e6/94/24/e69424dbee0c631d16e9388cd7c872a6--running-shoes-sale-nike-free-shoes.jpg',
          'https://i.pinimg.com/736x/e6/94/24/e69424dbee0c631d16e9388cd7c872a6--running-shoes-sale-nike-free-shoes.jpg',
        ]}
      />
      <div className="flex flex-col divide-y divide-sky-lighter">
        <ProductTitle
          name={product.name}
          price={product.price}
          isWish={true}
          pid={pid}
        />
        <Seller
          name={product.shop.name}
          rating={product.shop.rating ?? 5}
          amount={product.shop.totalSale}
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
