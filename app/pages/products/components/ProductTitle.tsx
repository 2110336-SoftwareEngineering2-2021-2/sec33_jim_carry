import { Button } from "app/core/components/Button"
import { FiHeart } from "react-icons/fi"

export interface ProductTitleProps {
  name: string
  price: number
}

export function ProductTitle({ name, price }: ProductTitleProps) {
  return (
    <div className="flex flex-col pt-4 pb-2 px-6">
      <p className="text-large leading-normal font-bold">{name}</p>
      <div className="flex flex-row justify-between items-center mt-2">
        <p className="text-large leading-normal font-medium text-primary-dark">{"฿" + price}</p>
        <Button buttonType="transparent" size="small" iconOnly>
          <FiHeart />
        </Button>
      </div>
    </div>
  )
}
