import { BlitzPage, Image, Routes, useQuery } from 'blitz'
import { Suspense, useState } from 'react'

import { TopBar } from 'app/core/components/TopBar'
import { SecondaryPageLayout } from 'app/core/layouts/SecondaryPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import searchProducts from 'app/product/queries/searchProducts'
import { SearchBar } from 'app/search/components/SearchBar'

import { SearchTag } from '../components/SearchTag'
import { SearchWithQuery } from '../components/SearchWithQuery'
import { SearchWithoutQuery } from '../components/SearchWithoutQuery'

function SearchComp({ text }: { text: string }) {
  const [order, setOrder] = useState<'name' | 'createdAt' | 'price' | 'rating'>(
    'name'
  )

  const [products] = useQuery(searchProducts, {
    name: text,
    orderBy: order,
    take: 100,
    skip: 0,
    orderType: 'asc',
  })

  return (
    <div>
      <div className="flex flex-col mx-6">
        {!text && <SearchWithoutQuery />}
      </div>
      {text && (
        <SearchWithQuery
          order={order}
          setOrder={setOrder}
          products={products}
        />
      )}
    </div>
  )
}

export const Search: BlitzPage = () => {
  const [text, setText] = useState('')
  return (
    <>
      <TopBar backHref={Routes.Home().pathname} title="" />
      <div className="flex flex-col mx-6">
        <SearchBar setText={setText} />
      </div>
      <Suspense fallback={null}>
        <SearchComp text={text} />
      </Suspense>
    </>
  )
}

setupAuthRedirect(Search)
setupLayout(Search)
export default Search
