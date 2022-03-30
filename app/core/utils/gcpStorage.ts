import { Storage } from '@google-cloud/storage'

import {
  gcpStorageClientEmail,
  gcpStoragePrivateKey,
  gcpStorageProjectId,
} from 'app/core/environment'

export const gc = new Storage({
  projectId: gcpStorageProjectId,
  credentials: {
    client_email: gcpStorageClientEmail,
    private_key: gcpStoragePrivateKey,
  },
})
