import { Routes, Image, Link } from 'blitz'
import { useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { ProductWithShop } from 'app/core/types/Product'

import { DeleteProductPrompt } from './DeleteProductPrompt'

interface ShopProductProps {
  product: ProductWithShop
  onDelete: (number) => void
}

export const ShopProduct = ({ product, onDelete }: ShopProductProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleDialogClose = () => setIsDialogOpen(false)

  return (
    <div className="flex space-x-4">
      <DeleteProductPrompt
        product={product}
        isOpen={isDialogOpen}
        handleClose={handleDialogClose}
        onProductDelete={onDelete}
      />
      <Link href={Routes.ProductDetail({ pid: product.id })}>
        <div className="relative aspect-square cursor-pointer">
          <Image
            src={product.images[0] ?? ''}
            alt={product.name}
            width={64}
            height={64}
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-row space-x-4">
        <div className="flex-1 flex flex-col space-y-1">
          <span className="text-small font-sans font-bold">{product.name}</span>
          <span
            className={`text-large ${
              product.soldPrice === null ? 'text-primary-dark' : 'text-sky-dark'
            }`}
          >
            {`฿${product.price}`}
          </span>
        </div>
        <div className="flex flex-row space-x-1">
          <Button buttonType="transparent" size="small" iconOnly>
            <FiEdit2 />
          </Button>
          <Button
            buttonType="transparent"
            size="small"
            iconOnly
            onClick={() => setIsDialogOpen(true)}
          >
            <FiTrash2 />
          </Button>
        </div>
      </div>
    </div>
  )
}
