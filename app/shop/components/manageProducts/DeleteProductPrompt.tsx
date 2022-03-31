import { Button } from 'app/core/components/Button'
import { Popover, PopoverTitle, PopoverText } from 'app/core/components/Popover'
import { ProductWithShop } from 'app/core/types/Product'

interface DeleteProductPromptProps {
  product: ProductWithShop
  isOpen: boolean
  handleClose: () => void
  onProductDelete: (number) => void
}

export const DeleteProductPrompt = ({
  product,
  isOpen,
  handleClose,
  onProductDelete,
}: DeleteProductPromptProps) => {
  return (
    <Popover isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col items-center py-6 gap-6">
        <div className="flex flex-col px-6 gap-2 text-center">
          <PopoverTitle>Delete product?</PopoverTitle>
          <PopoverText>
            Are you sure you want to delete{' '}
            <span className="font-bold">{product.name}</span> ? <br />
            This cannot be undone.
          </PopoverText>
        </div>
        <div className="flex flex-col px-6 gap-3 w-full">
          <Button
            fullWidth
            onClick={() => {
              onProductDelete(product.id)
              handleClose()
            }}
          >
            Yes, delete
          </Button>
          <Button fullWidth buttonType="transparent" onClick={handleClose}>
            No, thanks
          </Button>
        </div>
      </div>
    </Popover>
  )
}
