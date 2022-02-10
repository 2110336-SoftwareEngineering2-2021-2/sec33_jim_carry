import db from './index'

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const mockImageUrl = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
]

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const seed = async () => {
  let user = await db.user.findUnique({ where: { email: 'dummy@example.com' } })
  if (!user) {
    user = await db.user.create({ data: { email: 'dummy@example.com' } })
  }
  let shop = await db.shop.findUnique({ where: { userId: user.id } })
  if (!shop) {
    shop = await db.shop.create({
      data: { userId: user.id, name: 'nongtent', totalSale: 0 },
    })
  }

  for (let i = 1; i <= 10; i++) {
    await db.product.create({
      data: {
        shopId: shop.id,
        name: `Mock Product ${i}`,
        description: lorem,
        price: 100 * i,
        stock: i,
        hidden: false,
        image: mockImageUrl[(i - 1) % 3],
      },
    })
  }
}

export default seed
