import { AuthorizationError, Ctx, resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

import { ProductFormValues, UpdateProduct } from '../validations'

const compileInputValues = (values: z.infer<typeof ProductFormValues>) => {
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

const updateProduct = resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, data }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const compiledInput = compileInputValues(data)
    const product = await db.product.update({
      where: { id },
      data: compiledInput,
    })

    return product
  }
)

export default updateProduct
