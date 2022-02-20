import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'

import { CreateAddress } from '../validations'

const createAddress = resolver.pipe(
  resolver.zod(CreateAddress),
  resolver.authorize(),
  async (address, ctx: Ctx) => {
    if (!ctx.session.userId) throw new AuthorizationError()

    await db.address.create({
      data: {
        ...address,
        userId: ctx.session.userId,
      },
    })
  }
)

export default createAddress
