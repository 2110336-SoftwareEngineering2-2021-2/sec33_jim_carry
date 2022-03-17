import { PrismaClient } from '@prisma/client'
import { TransactionType, Order } from 'db'

import { commisionRate } from 'app/core/constants'

type PrismaDB = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>

export async function transferOrder(db: PrismaDB, order: Order) {
  const shop = await db.shop.findFirst({
    where: { id: order.shopId },
    select: { userId: true },
    rejectOnNotFound: true,
  })
  const income = order.totalPrice * (1 - commisionRate)
  await db.user.update({
    where: { id: shop.userId },
    data: {
      totalBalance: {
        increment: income,
      },
    },
  })
  return db.transaction.create({
    data: {
      userId: shop.userId,
      amount: income,
      orderId: order.id,
      type: TransactionType.ORDER,
    },
  })
}
