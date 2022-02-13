import { useState } from 'react'
import { FiCheck, FiMessageCircle, FiShoppingBag } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'

export interface FooterButtonProps {
  pid: number
}

export function FooterButton({ pid }: FooterButtonProps) {
  const [inBag, setInBag] = useState(false)
  const addToBagHandler = () => {
    setInBag(!inBag)
  }
  return (
    <div className="flex flex-row px-6 py-3 space-x-4 sticky bottom-0 bg-[#FFFFFF]">
      <Button buttonType="secondary" size="large" iconOnly>
        <FiMessageCircle size={24} />
      </Button>
      <Button
        buttonType={inBag ? 'outline' : 'primary'}
        size="large"
        sideIcon
        className="grow w-14 justify-center"
        onClick={addToBagHandler}
      >
        {inBag ? <FiCheck size={24} /> : <FiShoppingBag size={24} />}
        {inBag ? 'Added to Bag' : 'Add to Bag'}
      </Button>
    </div>
  )
}
