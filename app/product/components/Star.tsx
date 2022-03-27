import { Decimal } from '@prisma/client/runtime'
import { FiStar } from 'react-icons/fi'

export interface StarProps {
  rating: number
  noRating?: boolean
}

export function Star({ rating, noRating }: StarProps) {
  let stars: boolean[] = [true, true, true, true, true]
  const update = () => {
    for (let i = 0; i < 5; i++) {
      stars[i] = i + 1 <= rating
    }
  }
  update()
  const starsElement = stars.map((value, index) => (
    <FiStar
      key={index}
      className={`${
        noRating
          ? 'fill-ink-lighter stroke-ink-lighter'
          : value
          ? 'fill-yellow stroke-yellow '
          : 'stroke-yellow '
      }`}
    />
  ))
  return <div className="flex flex-row">{starsElement}</div>
}
