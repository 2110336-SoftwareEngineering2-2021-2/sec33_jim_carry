import { FiStar } from "react-icons/fi"

const Star = (props) => {
  let stars: boolean[] = [true, true, true, true, true]
  const update = () => {
    for (let i = 0; i < 5; i++) {
      stars[i] = i + 1 <= props.rating
    }
  }
  update()
  const starsElement = stars.map((value, index) => (
    <FiStar key={index} className={`${value ? "fill-yellow stroke-yellow " : "stroke-yellow "}`} />
  ))
  return <div className="flex flex-row">{starsElement}</div>
}

export default Star
