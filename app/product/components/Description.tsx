import { Tag } from "./Tag"

export interface DescriptionProps {
  description: string
  tags: string[]
}

export function Description({ tags, description }: DescriptionProps) {
  return (
    <div className="flex flex-col px-6 pt-4 pb-3 space-y-3">
      <div className="flex flex-row space-x-3">
        {tags.map((tag, index) => (
          <Tag key={index}>#{tag}</Tag>
        ))}
      </div>
      <p className="text-regular leading-normal font-regular text-ink-darkest break-words">
        {description}
      </p>
    </div>
  )
}
