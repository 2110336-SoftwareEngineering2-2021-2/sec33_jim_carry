import { AuthorizationError, Ctx, resolver } from 'blitz'

import { ConfirmCheckout } from '../validations'

export default resolver.pipe(
  resolver.zod(ConfirmCheckout),
  resolver.authorize(),
  async ({ addressId, cardId, itemIds }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    console.log(addressId, cardId, itemIds)
  }
)
