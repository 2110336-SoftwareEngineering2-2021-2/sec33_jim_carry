import { AuthorizationError, Ctx, NotFoundError } from 'blitz'
import db from 'db'

import { shippingCost } from 'app/core/constants'
import { groupBy } from 'app/core/utils/groupBy'
import { getCustomer, omise } from 'app/omise'
import { Cards } from 'app/users/validations'

export default async function getCheckoutSummary(_ = null, { session }: Ctx) {
  if (!session.userId) throw new AuthorizationError()

  const user = await db.user.findFirst({
    where: {
      id: session.userId,
    },
    select: {
      addresses: true,
    },
  })
  if (user === null) throw new NotFoundError()

  const items = await db.product.findMany({
    where: {
      stock: {
        gt: 0,
      },
      selectedBy: {
        some: {
          id: session.userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      images: true,
      price: true,
      shop: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  const customer = await getCustomer(session.userId)
  const cards = Cards.parse((await omise.customers.listCards(customer.id)).data)
  const itemIds = items.map((item) => item.id)
  const groupedItems = Object.values(groupBy(items, (item) => item.shop.id))
  const groups = groupedItems.map((items) => {
    const shop = items[0]!.shop
    const itemsWithoutShop = items.map(({ shop, ...item }) => item)
    const subtotal = items.reduce((total, item) => total + item.price, 0)
    const total = subtotal + shippingCost
    return {
      shop,
      items: itemsWithoutShop,
      subtotal,
      shipping: shippingCost,
      total,
    }
  })
  const totalPrice = groups.reduce((total, group) => total + group.total, 0)

  return { addresses: user.addresses, itemIds, groups, cards, totalPrice }
}
