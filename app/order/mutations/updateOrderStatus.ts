import { Order, OrderStatus } from '@prisma/client'
import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateOrderStatus = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
  status: z.nativeEnum(OrderStatus),
})

const updateOrderStatus = resolver.pipe(
  resolver.zod(UpdateOrderStatus),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
    // parse input
    const { id, status } = input

    // validate Order with shop's ownerId
    await db.order.findFirst({
      where: { id, shop: { userId } },
      select: { id: true },
      rejectOnNotFound: true,
    })

    //update status
    const order = await db.order.update({
      where: { id },
      data: { status },
    })

    return order
  }
)

export default updateOrderStatus
