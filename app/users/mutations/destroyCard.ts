import { resolver } from 'blitz'
import { z } from 'zod'

import { getCustomer, omise } from 'app/omise'

/**
 * Destroy a card.
 *
 * @param input - The card id to destroy.
 */
const destroyCard = resolver.pipe(
  resolver.zod(z.string().nonempty()),
  resolver.authorize(),
  async (cardId, ctx) => {
    const customer = await getCustomer(ctx.session.userId)
    await omise.customers.destroyCard(customer.id, cardId)
  }
)

export default destroyCard
