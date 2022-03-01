import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { createUnparsedSourceFile } from 'typescript'
import { z } from 'zod'

import { CreateProduct } from '../validations'

const compileInputValues = (values: z.infer<typeof CreateProduct>) => {
  const price = parseFloat(values.price)
  const stock = parseInt(values.stock)

  if (isNaN(price) || isNaN(stock))
    throw new TypeError('Price and stock must be a number')
  if (price < 0 || stock < 0)
    throw new RangeError('Price and stock cannot be negative')

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
  }
)

export default createProduct
