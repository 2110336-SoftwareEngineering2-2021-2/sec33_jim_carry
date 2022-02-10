import db from './index'

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
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
        name: `Product ${i}`,
        description: `Product number ${i}`,
        price: 100 * i,
        stock: i,
        hidden: false,
      },
    })
  }
}

export default seed
