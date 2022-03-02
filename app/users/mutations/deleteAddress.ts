import { NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const RemoveAddress = z.object({
  id: z.number(),
})

/**
 * Delete an address from the current user.
 *
 * @param input - The id of the address to delete.
 */
const deleteAddress = resolver.pipe(
  resolver.zod(RemoveAddress),
  resolver.authorize(),
  async ({ id }, { session }) => {
    const address = await db.address.findFirst({ where: { id } })
    if (address?.userId !== session.userId) return new NotFoundError()

    await db.address.delete({ where: { id } })
  }
)

export default deleteAddress
