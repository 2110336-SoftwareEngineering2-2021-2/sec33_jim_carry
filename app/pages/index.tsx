import { BlitzPage } from 'blitz'
import { Suspense } from 'react'

import { Spinner } from 'app/core/components/Spinner'
import { TextField } from 'app/core/components/TextField'
import { useWishlistContext } from 'app/core/context/useWishlistStore'
import { useProducts } from 'app/core/hooks/useProducts'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { ProductCard } from 'app/product/components/ProductCard'

const Home: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Products />
      </Suspense>
    </main>
  )
}

function Products() {
  const { products } = useProducts()
  return (
    <div className="p-6 flex flex-col space-y-6">
      <TextField placeholder="Search" className="w-full" />
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

setupAuthRedirect(Home)
Home.getLayout = (page) => <MainPageLayout title="Home">{page}</MainPageLayout>

export default Home
