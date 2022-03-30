import { resolver } from 'blitz'
import db from 'db'

import { TransformedProductFormValues } from '../validations'

const createProduct = resolver.pipe(
  resolver.zod(TransformedProductFormValues),
  resolver.authorize(),
  async (input, { session }) => {
    const compiledInput = { ...input, hidden: false }
    const product = await db.product.create({
      data: {
        ...compiledInput,
        shop: {
          connect: { userId: session.userId },
        },
      },
    })

    return product
  }
)

export default createProduct
