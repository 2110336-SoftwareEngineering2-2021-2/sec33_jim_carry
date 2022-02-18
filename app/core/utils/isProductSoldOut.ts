import { Product } from '@prisma/client'

export function isProductSoldOut(product: Pick<Product, 'stock'>): boolean {
  return product.stock === 0
}
