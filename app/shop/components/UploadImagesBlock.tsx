import { Image, Link } from 'blitz'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { gcpStorageUrl } from 'app/core/constants'

// TODO : Show image after upload
// TODO : Handle delete image
const uploadImage = async (e) => {
  const file = e.target.files[0]
  const filename = encodeURIComponent(file.name)

  // Get signed url from GCP Storage
  const res = await fetch(`/api/uploadURL?file=${filename}`)
  const { url, fields } = await res.json()
  console.log(url, fields)

  const formData = new FormData()
  const formArray: [string, string | File][] = Object.entries({
    ...fields,
    file,
  })
  formArray.forEach(([key, value]) => {
    formData.append(key, value)
  })

  const upload = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (upload.ok) {
    console.log(upload)
  } else {
    console.error('Upload failed')
  }
}

export const UploadImagesBlock = () => {
  return (
    <div className="border border-sky-light rounded-lg p-4 grid grid-cols-2 gap-4">
      <UploadedImage img={`${gcpStorageUrl}/images/rika-mei.jpg`} />
      <UploadedImage img={`${gcpStorageUrl}/images/86Lena_shirabi_ep16.jpg`} />

      <label
        htmlFor="img"
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
          id="img"
          hidden
          accept="image/png, image/jpeg"
          onChange={uploadImage}
        />
      </label>
    </div>
  )
}

const UploadedImage = ({ img }) => {
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
        src={img}
        alt="Uploaded image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  )
}
