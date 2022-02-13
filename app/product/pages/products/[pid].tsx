import { BlitzPage, useParam } from 'blitz'
import { Suspense } from 'react'

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
      <Suspense fallback={null}>
        <ProductView pid={pid} />
      </Suspense>
    </div>
  )
}

setupLayout(ProductDetail)

export default ProductDetail
