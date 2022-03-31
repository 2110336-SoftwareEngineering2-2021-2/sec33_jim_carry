import { OrderStatus } from '@prisma/client'
import { useMutation, useRouter } from 'blitz'

import { Avatar } from 'app/core/components/Avatar'
import { Button } from 'app/core/components/Button'
import { Divider } from 'app/core/components/Divider'

import updateOrderStatus from '../mutations/updateOrderStatus'
import { OrderProduct } from './OrderProduct'

export function ShopOrderCard({ order }) {
  const { replace, asPath } = useRouter()
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
  const buttonDisable = (status: OrderStatus) => {
    return status !== 'PAID' && status !== 'SHIPPED'
  }

  const buttonText = (status: OrderStatus) => {
    switch (status) {
      case 'PAID':
        return 'Confirm Shipment'
      case 'SHIPPED':
        return 'Complete Shipment'
      case 'COMPLETED':
        return 'Shipment Completed'
      case 'CANCELLED':
        return 'Order Cancled'
      default:
        return 'Waiting for Payment'
    }
  }
  const [updateStatusMutation] = useMutation(updateOrderStatus)

  const {
    id,
    owner,
    status,
    items,
    totalPrice,
    address,
    receiverName,
    receiverPhoneNo,
  } = order
  const { name, profileImage } = owner

  const update = async () => {
    if (status === 'PAID') {
      order = await updateStatusMutation({ id, status: 'SHIPPED' })
      replace(asPath)
    } else if (status === 'SHIPPED') {
      order = await updateStatusMutation({ id, status: 'COMPLETED' })
      replace(asPath)
    }
  }

  return (
    <div className="flex flex-col py-1 ">
      <div className="flex flex-col py-1 ">
        <div className="flex flex-row items-center justify-between space-x-2">
          <Avatar src={profileImage} size={24} />
          <p className="text-large font-bold grow truncate">{name}</p>
          <p className="text-large font-bold text-primary-base">
            {renameStatus(status)}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-regular font-bold text-ink-light">Order ID</p>
          <p className="text-regular font-bold">{id}</p>
        </div>
        <Divider className="my-3" />
        <div>
          <div className="flex flex-row items-left">
            <p className="text-large font-bold text-left">Ship To</p>
          </div>
          <div className="flex flex-row items-left">
            <p className="text-small leading-tight font-regular text-ink-lighter">
              {receiverName} | {receiverPhoneNo}
            </p>
          </div>
          <div className="flex flex-row items-left">
            <p className="text-small leading-tight font-regular text-ink-lighter">
              {address}
            </p>
          </div>
        </div>
        <Divider className="my-3" />
        <div>
          {items.map((item) => (
            <OrderProduct key={item.id} item={item} />
          ))}
        </div>
        <Divider className="my-3" />
        <div className="flex flex-row justify-between">
          <p className="text-large font-bold">Total</p>
          <p className="text-large font-bold">฿{totalPrice}</p>
        </div>
        <Button
          className="my-2"
          fullWidth
          buttonType="primary"
          size="large"
          disabled={buttonDisable(status)}
          onClick={update}
        >
          {buttonText(status)}
        </Button>
      </div>

      <Divider className="mt-2" />
    </div>
  )
}
