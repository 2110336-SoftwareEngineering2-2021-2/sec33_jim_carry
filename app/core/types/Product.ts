import { Product, Shop } from '@prisma/client'

export type ProductWithShop = Product & { shop: Shop }
