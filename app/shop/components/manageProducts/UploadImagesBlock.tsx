import { Image, useMutation, useQuery } from 'blitz'
import { forwardRef, PropsWithoutRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { ErrorMessage } from 'app/core/components/TextField'
import createUploadURL from 'app/core/mutations/createUploadURL'
import deleteUploadedImage from 'app/core/mutations/deleteUploadedImage'
import getCurrentUser from 'app/users/queries/getCurrentUser'
import { getImageUrl } from 'app/users/utils/getImageUrl'

interface UploadImagesBlockProps {
  initialValue: [string, ...string[]] | []
}

export const UploadImagesBlock = ({ initialValue }: UploadImagesBlockProps) => {
  const [user] = useQuery(getCurrentUser, null)
  const [createUploadURLMutation] = useMutation(createUploadURL)
  const {
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormContext()
  const watchImages: [] = watch('images', initialValue)
  const error = errors['images']?.message || errors['images']

  const handleImageAdd = (newImage: string) => {
    setValue('images', [...watchImages, newImage])
  }

  const handleImageDelete = (index: number) => {
    const newImages = [...watchImages]
    newImages.splice(index, 1)
    setValue('images', [...newImages])
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const { url, fields, filename } = await createUploadURLMutation({
      path: `images/shop-${user?.shop?.id}/`,
    })
    const formData = new FormData()
    const formArray: [string, string | File][] = Object.entries({
      ...fields,
      file,
    })
    formArray.forEach(([key, value]) => {
      formData.append(key, value)
    })

    await fetch(url, {
      method: 'POST',
      body: formData,
    })
    const imageUrl = getImageUrl(filename, `images/shop-${user?.shop?.id}`)
    handleImageAdd(imageUrl)
  }

  return (
    <div>
      <input {...register('images')} type="hidden" value={watchImages} />
      <div className="border border-sky-light rounded-lg p-4 grid grid-cols-2 gap-4">
        {watchImages &&
          watchImages.map((img, index) => {
            return (
              <UploadedImage
                key={`img-${index}`}
                img={img}
                onDelete={handleImageDelete}
                index={index}
              />
            )
          })}

        <label
          htmlFor="img-upload"
          className="aspect-square flex flex-col justify-center rounded-lg hover:bg-sky-lighter"
        >
          <FiPlus
            strokeWidth={0.5}
            size={84}
            className="stroke-primary-dark self-center"
          />
          <div className="text-small leading-tight font-regular text-primary-base text-center">
            Upload new image
          </div>
          <input
            type="file"
            id="img-upload"
            value=""
            disabled={isSubmitting}
            hidden
            accept="image/png, image/jpeg"
            onChange={uploadImage}
          />
        </label>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

const UploadedImage = ({ img, onDelete, index }) => {
  const [deleteUploadedImageMutation] = useMutation(deleteUploadedImage)

  return (
    <div className="relative aspect-square flex flex-col justify-center">
      <Button
        buttonType="secondary"
        type="button"
        size="small"
        iconOnly
        className="absolute top-2 right-2 z-10"
        onClick={async () => {
          onDelete(index)
          await deleteUploadedImageMutation({ url: img })
        }}
      >
        <FiTrash2 />
      </Button>
      <Image
        src={img}
        alt="Uploaded image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  )
}
