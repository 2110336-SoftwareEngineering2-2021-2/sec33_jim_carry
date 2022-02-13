import { useQuery } from 'blitz'

import getProduct from 'app/product/queries/getProduct'

export function useProduct(id?: number) {
  const [product] = useQuery(getProduct, { id })
  return product
}
