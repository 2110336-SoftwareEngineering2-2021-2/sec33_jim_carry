import { BlitzPage, Image, Routes } from 'blitz'
import { useState } from 'react'

import { TopBar } from 'app/core/components/TopBar'
import { SecondaryPageLayout } from 'app/core/layouts/SecondaryPageLayout'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { SearchBar } from 'app/search/components/SearchBar'

import { SearchTag } from '../components/SearchTag'
import { SearchWithQuery } from '../components/SearchWithQuery'
import { SearchWithoutQuery } from '../components/SearchWithoutQuery'

const Search: BlitzPage = () => {
  const [text, setText] = useState('')

  return (
    <div>
      <TopBar backHref={Routes.Home().pathname} title="" />
      <div className="flex flex-col mx-6">
        <SearchBar setText={setText} />
      </div>
      <div className="flex flex-col mx-6">
        {!text && <SearchWithoutQuery />}
      </div>
      {text && <SearchWithQuery />}
    </div>
  )
}

setupAuthRedirect(Search)
setupLayout(Search)
export default Search
