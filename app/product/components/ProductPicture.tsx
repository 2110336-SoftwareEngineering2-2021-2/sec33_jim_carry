import { useState } from "react"
import { useSpringCarousel } from "react-spring-carousel-js"

export interface ProductPictureProps {
  imgSrc: Array<string>
}

export function ProductPicture({ imgSrc }: ProductPictureProps) {
  const { carouselFragment, useListenToCustomEvent, getIsActiveItem, slideToItem } =
    useSpringCarousel({
      withLoop: true,
      items: imgSrc.map((e, idx) => {
        return {
          id: `items-${idx}`,
          renderItem: (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={e}
              alt="pic"
              className="object-contain max-h-full max-w-full pointer-events-none mx-auto"
            />
          ),
        }
      }),
    })
  const [active, setactive] = useState(0)
  useListenToCustomEvent((data) => {
    if (data.eventName === "onSlideStartChange") {
      console.log("KSDJfklj")
      for (let i = 0; i < imgSrc.length; i++) {
        if (getIsActiveItem(`items-${i}`)) {
          setactive(i)
        }
      }
    }
  })
  return (
    <div className="relative">
      <div className="h-[249px] bg-sky-lighter">{carouselFragment}</div>
      <div className="bg-gradient-to-t from-[#000000]/25 absolute bottom-0 right-0 w-full h-[60px]"></div>
      <div className="flex flex-row px-6 py-6 space-x-2 absolute bottom-0 right-0">
        {Array.from({ length: imgSrc.length }, (e, idx) => (
          <div
            key={idx}
            className={`${
              active == idx ? "bg-primary-base" : "bg-sky-white"
            } w-[8px] h-[8px] rounded-[1px]`}
            onClick={() => {
              slideToItem(`items-${idx}`)
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
