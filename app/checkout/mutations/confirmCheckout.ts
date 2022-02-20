import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'

import { shippingCost } from 'app/core/constants'
import { groupBy } from 'app/core/utils/groupBy'
import { getCustomer, omise } from 'app/omise'

import { ConfirmCheckout } from '../validations'

/**
 * Confirm the checkout and create an order for each shop.
 * The user's select card will be charged for each order.
 *
 * @param input - The user's shipping address and payment card, and the item ids to purchase.
 */
const confirmCheckout = resolver.pipe(
  resolver.zod(ConfirmCheckout),
  resolver.authorize(),
  async (
    { addressId, cardId: inputCardId, itemIds },
    { session: { userId } }: Ctx
  ) => {
    if (!userId) throw new AuthorizationError()

    const customer = await getCustomer(userId)
    const { id: cardId } = await omise.customers.retrieveCard(
      customer.id,
      inputCardId
    )

    const items = await db.product.findMany({
      select: {
        id: true,
        shopId: true,
      },
      where: {
        id: {
          in: itemIds,
        },
      },
    })

    const groupedItems = Object.values(groupBy(items, (item) => item.shopId))
    for (const items of groupedItems) {
      await createOrder(
        userId,
        items[0]!.shopId,
        items.map((item) => item.id),
        customer.id,
        cardId
      )
    }
  }
)

export default confirmCheckout

async function createOrder(
  userId: number,
  shopId: number,
  itemIds: number[],
  customerId: string,
  cardId: string
) {
  return await db.$transaction(async (db) => {
    await db.product.updateMany({
      data: {
        stock: {
          decrement: 1,
        },
      },
      where: {
        id: {
          in: itemIds,
        },
      },
    })

    const items = await db.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        images: true,
      },
      where: {
        id: {
          in: itemIds,
        },
      },
    })

    items.forEach((item) => {
      if (item.stock < 0) {
        throw new Error(`'${item.name}' is sold out`)
      }
    })

    const order = await db.order.create({
      data: {
        ownerId: userId,
        shopId: shopId,
        items: {
          createMany: {
            data: items.map((item) => ({
              productId: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              soldPrice: item.price,
              images: item.images,
            })),
          },
        },
      },
    })

    const subtotal = items.reduce((total, item) => total + item.price, 0)
    const total = subtotal + shippingCost
    const charge = await omise.charges.create({
      customer: customerId,
      card: cardId,
      amount: total * 100,
      currency: 'thb',
      capture: true,
      description: `Order ${order.id}`,
      metadata: {
        orderId: order.id,
      },
    })
    await db.order.update({
      data: {
        chargeId: charge.id,
      },
      where: {
        id: order.id,
      },
    })
  })
}
