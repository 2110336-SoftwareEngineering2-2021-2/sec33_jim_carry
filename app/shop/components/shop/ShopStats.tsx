import { PromiseReturnType } from 'blitz'

import { Avatar } from 'app/core/components/Avatar'
import { shortenAmount } from 'app/core/utils/shortenAmount'
import getShopProfile from 'app/shop/queries/getShopProfile'

interface ShopStatsProps {
  shop: PromiseReturnType<typeof getShopProfile>
}

export const ShopStats = ({ shop }: ShopStatsProps) => {
  const productsSold = shop.products.filter(
    (product) => product.soldPrice !== null
  ).length
  return (
    <div className="flex space-x-6">
      <Avatar src={shop.image} size={64} />
      <div className="flex flex-1">
        <StatsText label="products" number={shop.products.length} />
        <StatsText label="sold" number={productsSold} />
        <StatsText label="favorites" number={shop._count.followers} />
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
