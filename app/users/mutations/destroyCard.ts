import { AuthorizationError, Ctx, resolver } from 'blitz'
import { z } from 'zod'

import { getCustomer, omise } from 'app/omise'

export default resolver.pipe(
  resolver.zod(z.string().nonempty()),
  resolver.authorize(),
  async (cardId, ctx: Ctx) => {
    if (!ctx.session.userId) throw new AuthorizationError()

    const customer = await getCustomer(ctx.session.userId)
    await omise.customers.destroyCard(customer.id, cardId)
  }
)