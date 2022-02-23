import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { createUnparsedSourceFile } from 'typescript'
import { z } from 'zod'

import { CreateProduct } from '../validations'

const compileInputValues = (values: z.infer<typeof CreateProduct>) => {
  const price = parseFloat(values.price)
  const stock = parseInt(values.stock)

  if (price === NaN || stock === NaN)
    throw new TypeError('Price and stock must be a number')

  const hidden = false
  const hashtags = values.hashtags!.split(',').map((s) => s.trim())

  // TODO : Handle images
  const images = ['https://picsum.photos/500', 'https://picsum.photos/500']
  return { ...values, price, stock, hidden, hashtags, images }
}

const createProduct = resolver.pipe(
  resolver.zod(CreateProduct),
  resolver.authorize(),
  async (input, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()

    try {
      // TODO: in multi-tenant app, you must add validation to ensure correct tenant
      const compiledInput = compileInputValues(input)
      const product = await db.product.create({
        data: {
          ...compiledInput,
          shop: {
            connect: { userId: session.userId },
          },
        },
      })

      return product
    } catch (error) {
      throw error
    }
  }
)

export default createProduct
