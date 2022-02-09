import { SecondaryPageLayout } from "app/core/layouts/SecondaryPageLayout"
// import React, { Component, useState } from "react"
import { BlitzPage, Image } from "blitz"
import { SearchBar } from "app/search/components/SearchBar"
import { SearchWithoutQuery } from "../components/SearchWithoutQuery"
import { useState } from "react"

export const Search: BlitzPage = () => {
  const [text, setText] = useState("")

  return (
    <SecondaryPageLayout>
      <SearchBar setText={setText} />
      {!text && <SearchWithoutQuery />}
    </SecondaryPageLayout>
  )
}

{
  /* // search.getLayout = (page) => <SecondaryPageLayout>{page}</SecondaryPageLayout> */
}
