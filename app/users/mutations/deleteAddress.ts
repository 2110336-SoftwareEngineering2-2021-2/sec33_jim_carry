import { AuthorizationError, Ctx, NotFoundError, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const RemoveAddress = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(RemoveAddress),
  resolver.authorize(),
  async ({ id }, ctx: Ctx) => {
    if (!ctx.session.userId) throw new AuthorizationError()

    const address = await db.address.findFirst({ where: { id } })
    if (address?.userId !== ctx.session.userId) return new NotFoundError()

    await db.address.delete({ where: { id } })
  }
)
