import { BlitzPage, useParam } from 'blitz'
import { Suspense } from 'react'

import { ShoppingBagAction } from 'app/core/components/ShoppingBagAction'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupLayout } from 'app/core/utils/setupLayout'
import { ProductView } from 'app/product/components/ProductView'

const ProductDetail: BlitzPage = () => {
  const param = useParam('pid')
  let pid: number = 0
  if (typeof param == 'string') {
    pid = parseInt(param)
  }

  return (
    <div>
      <TopBar actions={<ShoppingBagAction />} />
      <Suspense fallback={<Spinner />}>
        <ProductView pid={pid} />
      </Suspense>
    </div>
  )
}

setupLayout(ProductDetail)

export default ProductDetail
