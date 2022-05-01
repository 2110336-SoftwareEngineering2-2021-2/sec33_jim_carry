import { resolver } from 'blitz'
import db from 'db'

/**
 * Get the current user's bank accounts.
 *
 * @returns An array of the user's bank accounts.
 */
const getBankAccounts = resolver.pipe(
  resolver.authorize(),
  async (_ = null, { session }) => {
    const { bankAccounts } = await db.user.findFirst({
      where: { id: session.userId },
      select: { bankAccounts: true },
      rejectOnNotFound: true,
    })
    return bankAccounts
  }
)

export default getBankAccounts
