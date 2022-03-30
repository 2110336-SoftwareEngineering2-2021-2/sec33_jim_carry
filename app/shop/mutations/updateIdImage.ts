import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateIdImage = z.object({
  citizenIdImage: z.string().nonempty(),
})

const updateIdImage = resolver.pipe(
  resolver.zod(UpdateIdImage),
  resolver.authorize(),
  async ({ citizenIdImage }, { session: { userId } }) => {
    return db.user.update({
      data: {
        shop: {
          update: {
            citizenIdImage,
          },
        },
      },
      include: { shop: true },
      where: { id: userId },
    })
  }
)

export default updateIdImage
