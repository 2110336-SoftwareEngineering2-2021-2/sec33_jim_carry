import Tag from "./Tag"

const Description = (props) => {
  const tags = props.tags
  return (
    <div className="flex flex-col px-6 pt-4 pb-3 space-y-3">
      <div className="flex flex-row space-x-3">
        {tags.map((tag, index) => (
          <Tag key={index} text={"#" + tag} />
        ))}
      </div>
      <p className="text-regular leading-normal font-regular text-ink-darkest break-words">
        {props.description}
      </p>
    </div>
  )
}

export default Description
