import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

import { CreateHashtag } from '../validations'

// TODO :  Create hashtags
const createHashtag = resolver.pipe(
  resolver.zod(CreateHashtag),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    if (!ctx.session.userId) throw new AuthorizationError()

    console.log(ctx)
  }
)

export default createHashtag
