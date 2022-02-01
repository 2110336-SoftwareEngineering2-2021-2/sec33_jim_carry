import { Button } from "app/core/components/Button"
import { FiHeart } from "react-icons/fi"

const ProductTitle = (props) => {
  return (
    <div className="flex flex-col pt-4 pb-2 px-6">
      <p className="text-large leading-normal font-bold">{props.name}</p>
      <div className="flex flex-row justify-between items-center mt-2">
        <p className="text-large leading-normal font-medium text-primary-dark">
          {"฿" + props.price}
        </p>
        <Button buttonType="transparent" size="small" iconOnly>
          <FiHeart />
        </Button>
      </div>
    </div>
  )
}

export default ProductTitle
