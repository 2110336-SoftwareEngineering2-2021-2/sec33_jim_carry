import { OrderItemSnapshot } from '@prisma/client'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FiStar } from 'react-icons/fi'

import LabeledTextField from 'app/core/components/LabeledTextField'

interface ReviewStarInputProps {
  orderItem: OrderItemSnapshot
}

export function ReviewStarInput({ orderItem }: ReviewStarInputProps) {
  const [rating, setRating] = useState(1)
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const name = `rating-${orderItem.productId}`
  let stars: boolean[] = [true, true, true, true, true]
  const update = () => {
    for (let i = 0; i < 5; i++) {
      stars[i] = i + 1 <= rating
    }
  }
  update()
  console.log(errors)

  const error = Array.isArray(errors[name])
    ? errors[name].join(', ')
    : errors[name]?.message || errors[name]
  console.log(error)

  const starsElement = stars.map((isFilled, index) => {
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
            isFilled ? 'fill-yellow stroke-yellow ' : 'stroke-yellow '
          }`}
        />
      </div>
    )
  })
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-row gap-1">{starsElement}</div>
      <p
        className={`text-tiny leading-none font-regular ${
          error ? 'text-error' : 'text-ink-lighter'
        }`}
      >
        {error ? error : 'Tap a Star to Review'}
      </p>
      <div className="flex flex-col gap-3 w-full">
        <LabeledTextField
          name={`title-${orderItem.productId}`}
          label={`Title`}
        />
        <LabeledTextField
          asTextArea
          style={{ height: '120px' }}
          name={`comment-${orderItem.productId}`}
          label={`Review`}
        />
      </div>
    </div>
  )
}
