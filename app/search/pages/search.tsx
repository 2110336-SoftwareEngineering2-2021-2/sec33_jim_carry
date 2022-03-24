import { BlitzPage, Routes, useQuery } from 'blitz'
import { Suspense, useState } from 'react'
import { FiArrowDown, FiArrowUp, FiSearch } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import searchProducts from 'app/product/queries/searchProducts'
import { SearchBar } from 'app/search/components/SearchBar'

import { Criteria } from '../components/Criteria'
import { SearchWithQuery } from '../components/SearchWithQuery'
import { SearchWithTag } from '../components/SearchWithTag'
import { SearchWithoutQuery } from '../components/SearchWithoutQuery'

function SearchComp({
  text,
  order,
  sortBy,
  tag,
}: {
  text: string
  order: 'name' | 'createdAt' | 'price' | 'rating'
  sortBy: 'asc' | 'desc'
  tag: string
}) {
  const [products] = useQuery(searchProducts, {
    name: text,
    orderBy: order,
    take: 100,
    skip: 0,
    orderType: sortBy,
    tag: tag,
  })

  return <>{text && <SearchWithQuery products={products} />}</>
}

export const Search: BlitzPage = () => {
  const [text, setText] = useState('')
  const [order, setOrder] = useState<'name' | 'createdAt' | 'price' | 'rating'>(
    'name'
  )
  const [sortBy, setSortBy] = useState<'desc' | 'asc'>('asc')

  const [tag, setTag] = useState('')
  const tags = [
    {
      key: 1,
      name: 'Adidas',
    },
    {
      key: 2,
      name: 'Shoes',
    },
    {
      key: 3,
      name: 'Watches',
    },
    {
      key: 4,
      name: 'Nike',
    },
    {
      key: 5,
      name: 'Bags',
    },
    {
      key: 6,
      name: 'Cameras',
    },
  ]

  return (
    <>
      <TopBar backHref={Routes.Home().pathname} title="" />
      <div className="flex flex-col mx-6">
        <SearchBar value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="my-1">
        <Criteria
          order={order}
          setOrder={setOrder}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <SearchWithTag tags={tags} tag={tag} setTag={setTag} />
      {!text && <SearchWithoutQuery />}
      <Suspense fallback={<Spinner />}>
        <SearchComp text={text} order={order} sortBy={sortBy} tag={tag} />
      </Suspense>
    </>
  )
}

setupLayout(Search)

export default Search
