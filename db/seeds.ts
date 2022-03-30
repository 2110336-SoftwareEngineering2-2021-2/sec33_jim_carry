import db from './index'
import { Prisma } from '.prisma/client'

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const mockImageUrls = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1585218356057-dc0e8d3558bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
]

const hashtags = [
  ['Bags'],
  ['Watches'],
  ['Watches'],
  ['Cameras'],
  ['Shoes', 'Nike'],
]

function shiftImages(shiftAmount: number) {
  const result: string[] = []
  const count = mockImageUrls.length
  for (let i = 0; i < count; i++) {
    result.push(mockImageUrls[(shiftAmount + i) % count]!)
  }
  return result
}

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const seed = async () => {
  const products: Prisma.ProductCreateWithoutShopInput[] = []

  for (let i = 1; i <= 10; i++) {
    products.push({
      name: `Mock Product ${i}`,
      description: lorem,
      price: 100 * i,
      stock: i,
      hidden: false,
      images: shiftImages(i),
      hashtags: hashtags[(i - 1) % 5],
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

export default seed
