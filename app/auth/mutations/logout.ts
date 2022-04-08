import { Ctx } from 'blitz'

/**
 * Logout the user
 */
export default async function logout(_: any, ctx: Ctx) {
  return await ctx.session.$revoke()
}
