import { PromiseReturnType } from 'blitz'

import getCheckoutSummary from '../queries/getCheckoutSummary'
import { CheckoutItem } from './CheckoutItem'

export interface CheckoutGroupProps {
  group: PromiseReturnType<typeof getCheckoutSummary>['groups'][number]
}

export function CheckoutGroup({
  group: { shop, items, subtotal, shipping, total },
}: CheckoutGroupProps) {
  return (
    <div className="flex flex-col px-6 gap-6">
      <p className="text-large leading-none font-bold text-ink-darkest">
        {shop.name}
      </p>
      {items.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <div className="flex flex-col gap-6 text-regular leading-none font-regular text-ink-darkest">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping &amp; Handling</span>
          <span>{shipping}</span>
        </div>
        <div className="flex justify-between text-large font-bold">
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  )
}
