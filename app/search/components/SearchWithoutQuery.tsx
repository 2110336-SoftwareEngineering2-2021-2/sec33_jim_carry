import { FiSearch } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

import { SearchRecommendationCateogry } from './SearchRecommendationCategory'

export const SearchWithoutQuery = () => {
  const imgUrlTest = '/images/search/mock_imageframe.png'
  const FrameTest = [
    {
      key: 1,
      imgUrl: imgUrlTest,
      name: 'Tops',
    },
    {
      key: 2,
      imgUrl: imgUrlTest,
      name: 'Tops',
    },
    {
      key: 3,
      imgUrl: imgUrlTest,
      name: 'Tops',
    },
    {
      key: 4,
      imgUrl: imgUrlTest,
      name: 'Tops',
    },
    {
      key: 5,
      imgUrl: imgUrlTest,
      name: 'Tops',
    },
    {
      key: 6,
      imgUrl: imgUrlTest,
      name: 'Tops',
    },
  ]
  return (
    <div className="mt-40">
      <EmptyState
        icon={<FiSearch strokeWidth={0.5} size={84} />}
        title={`Type to begin searching`}
      />
    </div>

    // category code
    // <div>
    //   <SearchRecommendationCateogry name="Woman's wear" frames={FrameTest} />
    //   <SearchRecommendationCateogry name="Man's wear" frames={FrameTest} />
    //   <SearchRecommendationCateogry
    //     name="Bags & Accessories"
    //     frames={FrameTest}
    //   />
    //   <SearchRecommendationCateogry name="Shoes" frames={FrameTest} />
    // </div>
  )
}
