import { resolver } from 'blitz'
import db from 'db'

import { CreateAddress } from '../validations'

/**
 * Create a new address for the current user.
 *
 * @param input - The address to create.
 */
const createAddress = resolver.pipe(
  resolver.zod(CreateAddress),
  resolver.authorize(),
  async (address, ctx) => {
    await db.address.create({
      data: {
        ...address,
        userId: ctx.session.userId,
      },
    })
  }
)

export default createAddress
