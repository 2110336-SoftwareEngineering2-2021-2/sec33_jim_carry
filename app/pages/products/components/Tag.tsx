const Tag = (props) => {
  return (
    <div className="px-4 py-2 bg-sky-lighter rounded-full">
      <p className="text-regular leading-none font-regular text-ink-darkest">{props.text}</p>
    </div>
  )
}
export default Tag
