import { SecondaryPageLayout } from "app/core/layouts/SecondaryPageLayout"
import { BlitzPage, Image } from "blitz"
import { SearchBar } from "app/search/components/SearchBar"
import { SearchWithoutQuery } from "../components/SearchWithoutQuery"
import { useState } from "react"
import { SearchTag } from "../components/SearchTag"
import { SearchWithQuery } from "../components/SearchWithQuery"

const Search: BlitzPage = () => {
  const [text, setText] = useState("")

  return (
    <SecondaryPageLayout>
      <div className="flex flex-col mx-6">
        <SearchBar setText={setText} />
      </div>
      <div className="flex flex-col mx-6">{!text && <SearchWithoutQuery />}</div>
      {text && <SearchWithQuery />}
    </SecondaryPageLayout>
  )
}

export default Search

{
  /* // search.getLayout = (page) => <SecondaryPageLayout>{page}</SecondaryPageLayout> */
}
