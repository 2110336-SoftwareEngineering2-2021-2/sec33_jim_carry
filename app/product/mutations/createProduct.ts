import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

import { ProductFormValues } from '../validations'

const compileInputValues = (values: z.infer<typeof ProductFormValues>) => {
  const price = parseFloat(values.price)
  const stock = parseInt(values.stock)

  if (isNaN(price) || isNaN(stock))
    throw new TypeError('Price and stock must be a number')
  if (price < 0 || stock < 0)
    throw new RangeError('Price and stock cannot be negative')

  const hidden = false
  const hashtags = values.hashtags!.split(',').map((s) => s.trim())

  return { ...values, price, stock, hidden, hashtags }
}

/**
 * Create a new product in the user's shop from specified input values.
 * @param input - the input values of the new product.
 * @param input.name - product name, required.
 * @param input.price - product price, required. The input string is parsed into a float.
 * @param input.stock - number of products in stock, required. The input string is parsed into an integer.
 * @param input.hashtags - hashtags associated with this product, separated by a comma e.g. in the format `hashtag1, hashtag2, hashtag3`. The input string is parsed into an array of strings. Optional.
 * @param input.description - product description, optional.
 * @param input.images - images of this product, in the format of an array of GCP Storage urls. At least 1 image is required.
 * @returns The created product.
 */

const createProduct = resolver.pipe(
  resolver.zod(ProductFormValues),
  resolver.authorize(),
  async (input, { session }) => {
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
