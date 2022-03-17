import { resolver } from 'blitz'

import { getCustomer, omise } from 'app/omise'

import { CardToken } from '../validations'

/**
 * Attach a card to the current user.
 *
 * @param input - The card token to attach.
 */
const attachCard = resolver.pipe(
  resolver.zod(CardToken),
  resolver.authorize(),
  async (cardToken, { session }) => {
    const customer = await getCustomer(session.userId)
    await omise.customers.update(customer.id, {
      card: cardToken,
    })
  }
)

export default attachCard
