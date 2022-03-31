export const isDevelopment = process.env.NODE_ENV === 'development'

export const prodAppOrigin = process.env.APP_ORIGIN as string
export const devServerOrigin = process.env.BLITZ_DEV_SERVER_ORIGIN as string
export const appOrigin = isDevelopment ? devServerOrigin : prodAppOrigin

export const googleClientId = process.env.GOOGLE_CLIENT_ID as string
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string

export const gcpStorageProjectId = process.env.GCP_STORAGE_PROJECT_ID as string
export const gcpStorageClientEmail = process.env
  .GCP_STORAGE_CLIENT_EMAIL as string
export const gcpStoragePrivateKey = process.env
  .GCP_STORAGE_PRIVATE_KEY as string
export const gcpStorageBucketName = process.env
  .GCP_STORAGE_BUCKET_NAME as string

export const omisePublicKey = process.env.OMISE_PUBLIC_KEY as string
export const omiseSecretKey = process.env.OMISE_SECRET_KEY as string
