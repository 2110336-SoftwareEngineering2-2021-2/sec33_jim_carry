import { Ctx } from 'blitz'
import db from 'db'

/**
 * Get the logged in user info
 *
 * @returns The user info
 */
export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      profileImage: true,
      shop: true,
    },
  })

  return user
}
