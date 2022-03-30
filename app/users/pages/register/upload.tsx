import { BlitzPage, Image, Link, Routes, useMutation } from 'blitz'
import { ChangeEvent, useRef, useState } from 'react'
import { FiImage } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import updateIdImage from 'app/shop/mutations/updateIdImage'
import { getImageUrl } from 'app/users/utils/getImageUrl'

const UploadIdPage: BlitzPage = () => {
  const [imageUrl, setImageUrl] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [updateIdImageMutation] = useMutation(updateIdImage)
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const filename = encodeURIComponent(file.name)
    const res = await fetch(
      `/api/uploadURL?file=${filename}&dir=${encodeURIComponent('userIds/')}`
    )
    const { url, fields } = await res.json()
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
    const imageUrl = getImageUrl(file.name, 'userIds')
    await updateIdImageMutation({ citizenIdImage: imageUrl })
    setImageUrl(imageUrl)
  }

  return (
    <div>
      <TopBar title="Upload your ID" largeTitle />
      <p className="px-6">This is so we can identify you.</p>
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex flex-col p-4 space-y-4 border border-sky-light rounded-lg">
          {imageUrl ? (
            <div className="w-full aspect-4/3 relative">
              <Image
                className="rounded-lg"
                src={imageUrl}
                alt="uploaded image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center aspect-4/3">
              <div className="flex flex-col space-y-4 items-center">
                <p className="text-primary-base text-[84px]">
                  <FiImage strokeWidth={0.5} size={84} />
                </p>
                <p className="text-small text-primary-base">
                  No image uploaded.
                </p>
              </div>
            </div>
          )}

          <input
            type="file"
            id="img"
            hidden
            accept="image/png, image/jpeg"
            ref={inputRef}
            onChange={uploadImage}
          />
          <Button
            fullWidth
            buttonType="secondary"
            onClick={() => {
              inputRef.current?.click()
            }}
          >
            {imageUrl ? 'Reupload Image' : 'Upload Image'}
          </Button>
        </div>
        <Link href={Routes.FinishRegisterPage().pathname} passHref>
          <Button fullWidth disabled={!imageUrl}>
            Submit
          </Button>
        </Link>
      </div>
    </div>
  )
}

setupAuthRedirect(UploadIdPage)
setupLayout(UploadIdPage)
export default UploadIdPage
