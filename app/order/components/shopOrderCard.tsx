import { Order, OrderItemSnapshot, OrderStatus, User } from '@prisma/client'

import { Avatar } from 'app/core/components/Avatar'
import { Divider } from 'app/core/components/Divider'

import { OrderProduct } from './OrderProduct'

export function ShopOrderCard({ order }) {
  const renameStatus = (status: OrderStatus) => {
    switch (status) {
      case 'PAID':
        return 'Paid'
      case 'SHIPPED':
        return 'Shipping'
      case 'COMPLETED':
        return 'Completed'
      case 'CANCELLED':
        return 'Canceled'
      default:
        return 'Pending'
    }
  }
  const { id, owner, status, items, totalPrice, address } = order
  const { name, profileImage } = owner

  return (
    <div className="flex flex-col px-6 py-3 ">
      <div className="flex flex-row items-center justify-between space-x-2">
        <Avatar src={profileImage} size={24} />
        <p className="text-large font-bold grow truncate">{name}</p>
        <p className="text-large font-bold text-primary-base">
          {renameStatus(status)}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-large font-bold text-ink-light">Order ID</p>
        <p className="text-large font-bold">{id}</p>
      </div>
      <Divider />
      <div>
        <div className="flex flex-row items-left">
          <p className="text-title3 text-left">Ship To</p>
        </div>
        <div className="flex flex-row itens-left">
          <p className="text-small leading-tight font-regular text-ink-lighter">
            {address}
          </p>
        </div>
      </div>
      <Divider />
      <div>
        {items.map((e, idx) => (
          <OrderProduct key={idx} item={e} />
        ))}
      </div>
      <Divider />
      <div className="flex flex-row justify-between">
        <p className="text-large font-bold">Total</p>
        <p className="text-large font-bold">฿{totalPrice}</p>
      </div>
    </div>
  )
}
