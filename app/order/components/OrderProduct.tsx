import { OrderItemSnapshot, Product } from '@prisma/client'
import { Image } from 'blitz'

export interface OrderProductProps {
  item: OrderItemSnapshot
}

export function OrderProduct({ item }: OrderProductProps) {
  return (
    <div className="py-3">
      <div className="flex space-x-4">
        <Image
          src={item.images[0] ?? ''}
          alt={item.name}
          width={64}
          height={64}
          objectFit="cover"
        />

        <div className="min-h-16 flex flex-col justify-center">
          <div className="flex flex-col space-y-1">
            <span className="text-small font-sans font-bold text-ink-darkest">
              {item.name}
            </span>
            <span className="text-large font-medium text-primary-dark">
              {`฿${item.price}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
