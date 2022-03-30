import { Order, OrderStatus } from '@prisma/client'

export function isProcessed(order: Pick<Order, 'status'>): boolean {
  return (
    order.status !== OrderStatus.PENDING && order.status !== OrderStatus.PAID
  )
}
