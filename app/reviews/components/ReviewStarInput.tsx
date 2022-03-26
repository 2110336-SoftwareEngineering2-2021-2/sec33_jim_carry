import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FiStar } from 'react-icons/fi'

interface ReviewStarInputProps {
  name: string
}

export function ReviewStarInput({ name }: ReviewStarInputProps) {
  const [rating, setRating] = useState(0)
  const { register } = useFormContext()
  let stars: boolean[] = [true, true, true, true, true]
  ;(() => {
    for (let i = 0; i < 5; i++) {
      stars[i] = i + 1 <= rating
    }
  })()
  const starsElement = stars.map((_, index) => {
    const id = `${name}-star-${index + 1}`
    return (
      <div
        key={index}
        onClick={() => {
          setRating(index + 1)
        }}
      >
        <input
          className="fixed w-7 h-7 opacity-0"
          type="radio"
          id={id}
          value={index + 1}
          checked={index + 1 === rating}
          {...register(name)}
        />
        <label htmlFor={id} title={`${index + 1} Stars`}></label>
        <FiStar
          size={28}
          className={`${
            index + 1 <= rating
              ? 'fill-yellow stroke-yellow '
              : 'stroke-yellow '
          }`}
        />
      </div>
    )
  })
  return <div className="flex flex-row space-x-1">{starsElement}</div>
}
