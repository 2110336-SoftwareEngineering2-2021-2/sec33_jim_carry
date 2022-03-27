import { Storage } from '@google-cloud/storage'
import { BlitzApiHandler } from 'blitz'

import {
  gcpStorageBucketName,
  gcpStorageClientEmail,
  gcpStoragePrivateKey,
  gcpStorageProjectId,
} from 'app/core/environment'

const handler: BlitzApiHandler = async (req, res) => {
  const gc = new Storage({
    projectId: gcpStorageProjectId,
    credentials: {
      client_email: gcpStorageClientEmail,
      private_key: gcpStoragePrivateKey,
    },
  })

  const bucket = gc.bucket(gcpStorageBucketName)
  const filename = req.query.file as string
  const folder = req.query.dir as string
  const file = bucket.file(`${folder}${filename}`)

  const [response] = await file.generateSignedPostPolicyV4({
    expires: Date.now() + 10 * 60 * 1000,
  })

  res.status(200).json(response)
}

export default handler
