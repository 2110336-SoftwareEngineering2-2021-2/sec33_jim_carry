import {
  BlitzPage,
  Image,
  invokeWithMiddleware,
  Link,
  PromiseReturnType,
  Routes,
  useMutation,
} from 'blitz'
import { ChangeEvent, useRef, useState } from 'react'
import { FiImage } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { TopBar } from 'app/core/components/TopBar'
import createUploadURL from 'app/core/mutations/createUploadURL'
import { wrapGetServerSideProps } from 'app/core/utils'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import updateImage from 'app/shop/mutations/updateImage'
import getShop from 'app/shop/queries/getShop'
import { getImageUrl } from 'app/users/utils/getImageUrl'

interface EditProfilePictureProps {
  shop: PromiseReturnType<typeof getShop>
}

const EditProfilePicture: BlitzPage<EditProfilePictureProps> = ({ shop }) => {
  const [imageUrl, setImageUrl] = useState(shop.image)
  const inputRef = useRef<HTMLInputElement>(null)
  const [createUploadURLMutation] = useMutation(createUploadURL)
  const [updateImageMutation] = useMutation(updateImage)

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const { url, fields, filename } = await createUploadURLMutation({
      path: `shopImages/`,
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
    const imageUrl = getImageUrl(filename, 'shopImages')
    await updateImageMutation({ image: imageUrl, shopId: shop.id })
    setImageUrl(imageUrl)
  }

  return (
    <div>
      <TopBar title="Edit Profile Picture" largeTitle />
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
        <Link href={Routes.ShopProfilePage({ shopId: shop.id })} passHref>
          <Button fullWidth disabled={!imageUrl}>
            Submit
          </Button>
        </Link>
      </div>
    </div>
  )
}

setupAuthRedirect(EditProfilePicture)
setupLayout(EditProfilePicture)

export const getServerSideProps = wrapGetServerSideProps(async (context) => {
  const shopId = parseInt(context.query.shopId as string)
  const shop = await invokeWithMiddleware(getShop, { id: shopId }, context)
  return { props: { shop } }
})
export default EditProfilePicture
