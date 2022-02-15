import { Image } from 'blitz'

export interface ImageFrameProps {
  // path of image for now
  key: number
  imgUrl: string
  name: string
}

export const ImageFrame = ({ key, imgUrl, name }: ImageFrameProps) => {
  return (
    <div className="relative w-[96px] h-[96px] min-w-[96px]">
      <Image
        src={imgUrl}
        alt="product frame"
        className="object-cover w-full h-full"
        layout="fill"
      />

      <div className="absolute w-full py-2.5 bottom-0 inset-x-0 bg-blue-400 text-center leading-none text-sky-white font-large font-bold">
        {name}
      </div>
    </div>
  )
}
