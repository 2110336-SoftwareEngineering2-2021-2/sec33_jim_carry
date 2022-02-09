import { FiArrowRight } from "react-icons/fi"
import { ImageFrame } from "./ImageFrame"
interface Frame {
  // path of image for now
  key: number
  imgUrl: string
  name: string
}

export interface SearchRecommendationCateogryProps {
  name: string
  frames: Frame[]
}

export const SearchRecommendationCateogry = ({
  name,
  frames,
}: SearchRecommendationCateogryProps) => {
  return (
    <div className="my-6">
      <div className="h-6 items-center flex flex-row my-3">
        <p className="ink flex-1"> {name} </p>
        <FiArrowRight />
      </div>
      <div className="flex flex-row overflow-x-scroll gap-x-[20px]">
        {frames.map((frame, index) => (
          <ImageFrame key={frame.key} imgUrl={frame.imgUrl} name={frame.name} />
        ))}
      </div>
    </div>
  )
}
