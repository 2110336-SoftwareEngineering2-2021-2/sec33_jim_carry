import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

const UpdateIdImage = z.object({
  citizenIdImage: z.string().nonempty(),
})

/**
 * Update citizen id image for the user's registered shop
 *
 * @param input.citizenIdImage Citizen Id
 *
 * @returns The User that has been updated with Shop included
 */
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
