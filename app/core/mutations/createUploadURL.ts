import { resolver } from 'blitz'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { gcpStorageBucketName } from 'app/core/environment'

import { gc } from '../utils/gcpStorage'

const CreateUploadURL = z.object({
  path: z.string(),
})

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
