import { SecondaryPageLayout } from "app/core/layouts/SecondaryPageLayout"
import React, { Component } from "react"
import { BlitzPage, Image } from "blitz"
import { SearchBar } from "app/search/components/SearchBar"
import { SearchRecommendationCateogry } from "../components/SearchRecommendationCategory"

const search: BlitzPage = () => {
  const imgUrlTest = "/images/search/mock_imageframe.png"
  const FrameTest = [
    {
      key: 1,
      imgUrl: imgUrlTest,
      name: "Tops",
    },
    {
      key: 2,
      imgUrl: imgUrlTest,
      name: "Tops",
    },
    {
      key: 3,
      imgUrl: imgUrlTest,
      name: "Tops",
    },
    {
      key: 4,
      imgUrl: imgUrlTest,
      name: "Tops",
    },
    {
      key: 5,
      imgUrl: imgUrlTest,
      name: "Tops",
    },
    {
      key: 6,
      imgUrl: imgUrlTest,
      name: "Tops",
    },
  ]
  return (
    <SecondaryPageLayout>
      <SearchBar />
      <SearchRecommendationCateogry name="Woman's wear" frames={FrameTest} />
      <SearchRecommendationCateogry name="Man's wear" frames={FrameTest} />
      <SearchRecommendationCateogry name="Bags & Accessories" frames={FrameTest} />
      <SearchRecommendationCateogry name="Shoes" frames={FrameTest} />
    </SecondaryPageLayout>
  )
}

{
  /* // search.getLayout = (page) => <SecondaryPageLayout>{page}</SecondaryPageLayout> */
}

export default search
