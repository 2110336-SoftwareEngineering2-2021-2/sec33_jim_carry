import { BlitzPage, Link, Routes } from 'blitz'
import { Suspense, useState } from 'react'

import { Spinner } from 'app/core/components/Spinner'
import { TextField } from 'app/core/components/TextField'
import { useProducts } from 'app/core/hooks/useProducts'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { ProductCard } from 'app/product/components/ProductCard'
import { SearchBar } from 'app/search/components/SearchBar'

const Home: BlitzPage = () => {
  const [text, setText] = useState('')
  return (
    <main>
      <div className="flex flex-col mx-6 mt-6">
        <Link href={Routes.Search().pathname} passHref>
          <SearchBar setText={setText} />
        </Link>
      </div>
      <Suspense fallback={<Spinner />}>
        <Products />
      </Suspense>
    </main>
  )
}

export function Products() {
  const { products } = useProducts()
  return (
    <div className="p-6 flex flex-col space-y-6">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

setupAuthRedirect(Home)
Home.getLayout = (page) => <MainPageLayout title="Home">{page}</MainPageLayout>

export default Home
