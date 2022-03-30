import { PromiseReturnType, useQuery } from 'blitz'

import { Avatar } from 'app/core/components/Avatar'
import { shortenAmount } from 'app/core/utils/shortenAmount'
import countOrders from 'app/order/queries/countSoldOrders'
import countProducts from 'app/product/queries/countProducts'
import countFavorites from 'app/shop/queries/countFavorites'
import getShop from 'app/shop/queries/getShop'

interface ShopStatsProps {
  shop: PromiseReturnType<typeof getShop>
}

export const ShopStats = ({ shop }: ShopStatsProps) => {
  const [productCount] = useQuery(
    countProducts,
    { where: { shopId: shop.id } },
    { suspense: true }
  )
  const [soldCount] = useQuery(
    countOrders,
    {
      where: {
        shopId: shop.id,
        status: { not: 'CANCELLED' },
      },
    },
    { suspense: true }
  )
  const [favoritesCount] = useQuery(
    countFavorites,
    {
      shopId: shop.id,
    },
    { suspense: true }
  )
  return (
    <div className="flex space-x-6">
      <Avatar src={shop.image} size={64} />
      <div className="flex flex-1">
        <StatsText label="products" number={productCount} />
        <StatsText label="sold" number={soldCount} />
        <StatsText label="favorites" number={favoritesCount} />
      </div>
    </div>
  )
}

interface StatsTextProps {
  number: number
  label: string
}

const StatsText = ({ number, label }: StatsTextProps) => {
  return (
    <div className="text-center flex-1">
      <p className="text-title3 title3 text-ink-darkestt">
        {shortenAmount(number)}
      </p>
      <p className="text-regular text-ink-darkest">{label}</p>
    </div>
  )
}
