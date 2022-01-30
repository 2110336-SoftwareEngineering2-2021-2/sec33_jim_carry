import { FiHeart } from "react-icons/fi"

const ProductTitle = (props) => {
  return (
    <div className="flex flex-col pt-4 pb-2 px-6">
      <p className="text-large leading-normal font-bold">{props.name}</p>
      <div className="flex flex-row justify-between items-center mt-2">
        <p className="text-large leading-normal font-medium text-primary-dark">
          {"฿" + props.price}
        </p>
        <FiHeart className="mx-3 my-3 stroke-primary-base" />
      </div>
    </div>
  )
}

export default ProductTitle
