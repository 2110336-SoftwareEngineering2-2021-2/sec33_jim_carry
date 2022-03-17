import { resolver } from 'blitz'

import { getCustomer, omise } from 'app/omise'

import { Cards } from '../validations'

/**
 * Get the current user's cards.
 *
 * @returns An array of the user's cards from Omise.
 */
const getCards = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }) => {
    const customer = await getCustomer(session.userId)
    const cards = await omise.customers.listCards(customer.id)
    return Cards.parse(cards.data)
  }
)

export default getCards
