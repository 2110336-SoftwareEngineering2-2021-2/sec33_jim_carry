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

  return { ...values, price, stock, hidden, hashtags }
}

/**
 * Update the values of an existing product in the user's shop.
 * @param input.id - product id of the product to be updated.
 * @param input.data - the updated values of the product.
 * @param input.data.name - product name, required.
 * @param input.data.price - product price, required. The input string is parsed into a float.
 * @param input.data.stock - number of products in stock, required. The input string is parsed into an integer.
 * @param input.data.hashtags - hashtags associated with this product, separated by a comma e.g. in the format `hashtag1, hashtag2, hashtag3`. The input string is parsed into an array of strings. Optional.
 * @param input.data.description - product description, optional.
 * @param input.data.images - images of this product, in the format of an array of GCP Storage urls. At least 1 image is required.
 * @returns The updated product.
 */

const updateProduct = resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, data }, { session }: Ctx) => {
    if (!session.userId) throw new AuthorizationError()
    const user = await db.user.findFirst({
      where: { id: session.userId },
      select: {
        shop: {
          select: { id: true },
        },
      },
    })
    // Find a product with this ID and in this user's shop
    const product = await db.product.findFirst({
      where: { id, shopId: user?.shop?.id },
    })
    if (!product) throw new Error('Update not allowed, product not in shop')

    const compiledInput = compileInputValues(data)
    const updatedProduct = await db.product.update({
      where: { id },
      data: compiledInput,
    })
    return updatedProduct
  }
)
export default updateProduct
