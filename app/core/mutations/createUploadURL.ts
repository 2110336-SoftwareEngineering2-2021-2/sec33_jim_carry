import { resolver } from 'blitz'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { gcpStorageBucketName } from 'app/core/environment'

import { gc } from '../utils/gcpStorage'

const CreateUploadURL = z.object({
  path: z.string(),
})

/**
 * Create a signed upload URL to be used for file upload to GCP Storage.
 * @param path - the directory in GCP storage the file will be stored.
 * @returns The upload url, fields for signed files, and the generated filename to be used in the access URL.
 */

const createUploadURL = resolver.pipe(
  resolver.zod(CreateUploadURL),
  resolver.authorize(),
  async ({ path }) => {
    const bucket = gc.bucket(gcpStorageBucketName)
    const filename = uuidv4()
    const file = bucket.file(`${path}${filename}`)

    const [response] = await file.generateSignedPostPolicyV4({
      expires: Date.now() + 1 * 60 * 1000,
    })

    return { ...response, filename }
  }
)

export default createUploadURL
