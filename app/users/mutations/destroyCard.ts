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
  async (cardId, { session }) => {
    const customer = await getCustomer(session.userId)
    await omise.customers.destroyCard(customer.id, cardId)
  }
)

export default destroyCard
