import { Image } from 'blitz'
import { Product } from 'db'

interface ShopProductsCardProps {
  product: Product
}

export const ShopProductCard = ({ product }: ShopProductsCardProps) => {
  return (
    <div className="w-full h-40 relative z-0">
      <Image
        src={product.images[0] ?? ''}
        alt={product.name}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <ProductStock stock={product.stock} />
      <ProductPrice price={product.price} />
    </div>
  )
}

interface ProductStockProps {
  stock: number
}

const ProductStock = ({ stock }: ProductStockProps) => {
  return (
    <div className="absolute top-0 right-0 m-2 px-2 z-10 rounded-full bg-sky-white text-small text-ink-darkest">
      {stock} in stock
    </div>
  )
}

interface ProductPriceProps {
  price: number
}

const ProductPrice = ({ price }: ProductPriceProps) => {
  return (
    <div className="absolute bottom-0 left-0 px-4 pt-2 pb-1 z-10 rounded-tr-2xl bg-primary-lightest text-large font-medium text-primary-dark">
      ฿{price}
    </div>
  )
}
