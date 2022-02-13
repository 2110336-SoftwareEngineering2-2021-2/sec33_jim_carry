import { BlitzApiHandler, invokeWithMiddleware } from 'blitz'

import addToShoppingCart from 'app/shoppingCart/mutations/addToShoppingCart'
import removeFromShoppingCart from 'app/shoppingCart/mutations/removeFromShoppingCart'
import getShoppingCart from 'app/shoppingCart/queries/getShoppingCart'

const handler: BlitzApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const shoppingCart = await invokeWithMiddleware(
      getShoppingCart,
      {},
      { req, res }
    )
    res.status(200).json(shoppingCart)
  } else if (req.method === 'POST') {
    const { productId } = req.body
    const user = await invokeWithMiddleware(
      addToShoppingCart,
      { productId },
      { req, res }
    )
    res.status(200).json(user)
  } else if (req.method === 'DELETE') {
    const { productId } = req.body
    const user = await invokeWithMiddleware(
      removeFromShoppingCart,
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
