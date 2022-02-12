import { BlitzApiHandler, invokeWithMiddleware } from 'blitz'

import getWishlist from 'app/wishlist/queries/getWishlist'
import addToWishlist from 'app/wishlist/mutations/addToWishlist'
import removeFromWishlist from 'app/wishlist/mutations/removeFromWishlist'

const handler: BlitzApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const wishlist = await invokeWithMiddleware(getWishlist, {}, { req, res })
    res.status(200).json(wishlist)
  } else if (req.method === 'POST') {
    const { productId } = req.body
    const user = await invokeWithMiddleware(
      addToWishlist,
      { productId },
      { req, res }
    )
    res.status(200).json(user)
  } else if (req.method === 'DELETE') {
    const { productId } = req.body
    const user = await invokeWithMiddleware(
      removeFromWishlist,
      { productId },
      { req, res }
    )
    res.status(200).json(user)
  } else {
    res.status(405).json({
      error: 'Method not allowed',
    })
  }
}
export default handler
