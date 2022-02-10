import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const User = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().optional(),
  profileImage: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(User),
  resolver.authorize(),
  async ({ id, ...data }) => {
    await db.user.update({
      where: { id },
      data,
    })
  }
)
