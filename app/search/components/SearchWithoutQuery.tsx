import { SearchRecommendationCateogry } from "./SearchRecommendationCategory"

export const SearchWithoutQuery = () => {
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
    <div>
      <SearchRecommendationCateogry name="Woman's wear" frames={FrameTest} />
      <SearchRecommendationCateogry name="Man's wear" frames={FrameTest} />
      <SearchRecommendationCateogry name="Bags & Accessories" frames={FrameTest} />
      <SearchRecommendationCateogry name="Shoes" frames={FrameTest} />
    </div>
  )
}
