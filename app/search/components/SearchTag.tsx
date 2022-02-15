import { Tag } from 'app/product/components/Tag'

export const SearchTag = () => {
  const Tags = [
    {
      key: 1,
      name: 'Adidas',
    },
    {
      key: 2,
      name: 'Shoes',
    },
    {
      key: 3,
      name: 'Mayday',
    },
    {
      key: 4,
      name: 'Pun',
    },
    {
      key: 5,
      name: 'GoodGoods',
    },
    {
      key: 6,
      name: 'Green',
    },
  ]
  return (
    <div
      className="
        px-6 bg-transperant
        flex flex-row items-center gap-2
        overflow-x-auto 
        "
    >
      {/* {Tags.map((tag, index) => (
        <div key={tag.key}>
          <Tag>{tag.name}</Tag>
        </div>
      ))} */}
    </div>
  )
}
