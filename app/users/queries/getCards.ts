import { resolver, Ctx, AuthorizationError } from 'blitz'

import { getCustomer, omise } from 'app/omise'

import { Cards } from '../validations'

const getCards = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    const customer = await getCustomer(session.userId)
    const cards = await omise.customers.listCards(customer.id)
    return Cards.parse(cards.data)
  }
)

export default getCards
