import { resolver } from 'blitz'
import db from 'db'

import { SendProductLink } from '../realtime/validations'

const sendProductLink = resolver.pipe(
  resolver.zod(SendProductLink),
  resolver.authorize(),
  async ({ chatId, productId }, ctx) => {
    const product = await db.product.findUnique({
      where: { id: productId },
      rejectOnNotFound: true,
    })
    const payload = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images[0],
    }
    const messageObj = await db.message.create({
      data: {
        type: 'PRODUCT_LINK',
        payload,
        sender: {
          connect: {
            id: ctx.session.userId,
          },
        },
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
    })
    ctx.chatManager.handleNewMessage(messageObj)
  }
)

export default sendProductLink
