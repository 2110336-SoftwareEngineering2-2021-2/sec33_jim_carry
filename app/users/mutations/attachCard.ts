import { AuthorizationError, Ctx, resolver } from 'blitz'

import { getCustomer, omise } from 'app/omise'

import { CardToken } from '../validations'

const attachCard = resolver.pipe(
  resolver.zod(CardToken),
  resolver.authorize(),
  async (cardToken, ctx: Ctx) => {
    if (!ctx.session.userId) throw new AuthorizationError()

    const customer = await getCustomer(ctx.session.userId)
    await omise.customers.update(customer.id, {
      card: cardToken,
    })
  }
)

export default attachCard
