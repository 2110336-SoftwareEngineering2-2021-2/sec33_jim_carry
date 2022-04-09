import { Storage } from '@google-cloud/storage'
import { resolver } from 'blitz'
import { z } from 'zod'

import { gcpStorageBucketName } from 'app/core/environment'

import { gcpStorageUrl } from '../constants'
import { gc } from '../utils/gcpStorage'

const DeleteUploadedImage = z.object({
  url: z.string().nonempty(),
})

/**
 * Delete a file from GCP Storage.
 * @param url - The access URL to the file to be deleted.
 */

const deleteUploadedImage = resolver.pipe(
  resolver.zod(DeleteUploadedImage),
  resolver.authorize(),
  async ({ url }) => {
    const bucket = gc.bucket(gcpStorageBucketName)
    const file = bucket.file(url.slice(gcpStorageUrl.length + 1))

    await file.delete()
  }
)

export default deleteUploadedImage
