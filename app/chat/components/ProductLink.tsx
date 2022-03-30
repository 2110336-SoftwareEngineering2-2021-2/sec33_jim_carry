import { Image, Link, Routes } from 'blitz'
import { FiCheck } from 'react-icons/fi'

export interface ProductLinkData {
  id: number
  name: string
  price: number
  imageUrl?: string
}

export interface ProductLinkProps {
  data: ProductLinkData
  sent?: boolean
}

export function ProductLink({ data, sent = false }: ProductLinkProps) {
  const { id, name, price, imageUrl = '' } = data
  return (
    <Link href={Routes.ProductDetail({ pid: id })} passHref>
      <a className="my-4 p-4 rounded-xl ring-1 ring-sky-light">
        <div className="flex space-x-4">
          <Image
            src={imageUrl}
            alt={name}
            width={64}
            height={64}
            objectFit="cover"
          />

          <div className="flex-1 min-h-16 flex flex-col justify-center">
            <div className="flex flex-col space-y-1">
              <span className="text-small font-sans font-bold text-ink-darkest">
                {name}
              </span>
              <div className="flex items-center pt-2">
                <span className="flex-1 text-large font-medium text-primary-dark">
                  {`฿${price}`}
                </span>
                {sent && (
                  <span className="flex gap-1 text-success font-regular">
                    <FiCheck />
                    Link sent
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
