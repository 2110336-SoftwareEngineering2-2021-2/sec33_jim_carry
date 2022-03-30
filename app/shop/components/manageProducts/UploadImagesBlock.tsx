import { Image, Link } from 'blitz'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'

// TODO : Handle upload

export const UploadImagesBlock = () => {
  return (
    <div className="border border-sky-light rounded-lg p-4 grid grid-cols-2 gap-4">
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />

      <div className="aspect-square flex flex-col justify-center rounded-lg hover:bg-sky-lighter">
        <FiPlus
          strokeWidth={0.5}
          size={84}
          className="stroke-primary-dark self-center"
        />
        <div className="text-small leading-tight font-regular text-primary-base text-center">
          Upload new image
        </div>
      </div>
    </div>
  )
}

const UploadedImage = () => {
  return (
    <div className="relative aspect-square flex flex-col justify-center">
      <Button
        buttonType="secondary"
        size="small"
        iconOnly
        className="absolute top-2 right-2 z-10"
      >
        <FiTrash2 />
      </Button>
      <Image
        src="https://picsum.photos/500"
        alt="Uploaded image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  )
}
