import { OrderStatus, Prisma } from '@prisma/client'
import db from 'db'
import createMockContext from 'test/createMockContext'

import { OrderCard } from 'app/order/components/OrderCard'

import writeReview from './writeReview'

async function createMockShop() {
  const products: Prisma.ProductCreateWithoutShopInput[] = []

  for (let i = 1; i <= 10; i++) {
    products.push({
      name: `Mock Product ${i}`,
      description: 'lorem ipsum',
      price: 100 * i,
      stock: i,
      hidden: false,
    })
  }

  const createUser: Prisma.UserCreateInput = {
    email: 'dummy@example.com',
    name: 'John Doe',
    shop: {
      create: {
        name: 'nongtent',
        products: {
          create: products,
        },
      },
    },
  }

  const updateUser: Prisma.UserUpdateInput = {
    email: 'dummy@example.com',
    name: 'John Doe',
    shop: {
      update: {
        name: 'nongtent',
        products: {
          create: products,
        },
      },
    },
  }

  await db.product.deleteMany({})

  await db.user.upsert({
    where: { email: createUser.email },
    create: createUser,
    update: updateUser,
  })
}

async function createMockOrder({ ownerId, shopId, status, items }) {
  const order = await db.order.create({
    data: {
      ownerId,
      shopId,
      status,
      items: {
        createMany: {
          data: items,
        },
      },
      totalPrice: 100,
      address: '',
      addressNote: '',
      receiverName: '',
      receiverPhoneNo: '',
    },
  })
  return order
}

function getMockItems(productIds: number[]) {
  return productIds.map((productId) => ({
    productId,
    name: 'Some Product',
    description: 'Lorem Ipsum',
    price: 500,
    soldPrice: 500,
    images: [],
  }))
}

async function getMockCtx() {
  const user = await db.user.create({
    data: {
      email: 'user@example.com',
      role: 'USER',
    },
  })

  return createMockContext({ user })
}

beforeEach(async () => {
  await db.$reset()
  await createMockShop()
})

describe('writeReview', () => {
  it('order not found', async () => {
    const orderId = 5
    const { ctx } = await getMockCtx()
    await expect(async () => {
      await writeReview({ orderId, reviews: [] }, ctx)
    }).rejects.toThrow('Order not found')
  })
  it("user doesn't own that order", async () => {
    const { ctx } = await getMockCtx()
    const owner = await db.user.create({
      data: {
        email: 'owner@example.com',
        role: 'USER',
      },
    })
    const { id: orderId } = await createMockOrder({
      ownerId: owner.id,
      shopId: 1,
      status: OrderStatus.COMPLETED,
      items: [],
    })
    await expect(async () => {
      await writeReview({ orderId, reviews: [] }, ctx)
    }).rejects.toThrow('You do not own this order')
  })
  it('order status is not "completed"', async () => {
    const { ctx } = await getMockCtx()
    const userId = ctx.session.userId
    const { id: orderId } = await createMockOrder({
      ownerId: userId,
      shopId: 1,
      status: OrderStatus.CANCELLED,
      items: [],
    })
    await expect(async () => {
      await writeReview({ orderId, reviews: [] }, ctx)
    }).rejects.toThrow('Order must be completed to write a review')
  })

  it('product not found', async () => {
    const { ctx } = await getMockCtx()
    const userId = ctx.session.userId
    const items = getMockItems([1, 2, 3, 4])
    const { id: orderId } = await createMockOrder({
      ownerId: userId,
      shopId: 1,
      status: OrderStatus.COMPLETED,
      items,
    })
    const reviews = [
      {
        productId: 200,
        rating: 5,
        comment: 'Good',
        title: 'Title',
      },
    ]
    await expect(async () => {
      await writeReview({ orderId, reviews }, ctx)
    }).rejects.toThrow('Product not found')
  })

  it('success', async () => {
    const { ctx } = await getMockCtx()
    const userId = ctx.session.userId
    const items = getMockItems([1, 2, 3, 4])
    const { id: orderId } = await createMockOrder({
      ownerId: userId,
      shopId: 1,
      status: OrderStatus.COMPLETED,
      items,
    })
    const reviews = items.map((item) => ({
      productId: item.productId,
      rating: 5,
      comment: '',
      title: 'Title',
    }))
    const reviewsData = await writeReview({ orderId, reviews }, ctx)
    reviewsData.forEach((reviewData, index) => {
      const review = reviews[index]!
      expect(reviewData.productId).toBe(review.productId)
      expect(reviewData.rating).toBe(review.rating)
      expect(reviewData.comment).toBe(review.comment)
      expect(reviewData.title).toBe(review.title)
      expect(reviewData.shopId).toBe(1)
      expect(reviewData.userId).toBe(userId)
    })
  })
})
