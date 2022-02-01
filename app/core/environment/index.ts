export const isDevelopment = process.env.NODE_ENV === "development"

export const prodAppOrigin = process.env.APP_ORIGIN as string
export const devServerOrigin = process.env.BLITZ_DEV_SERVER_ORIGIN as string
export const appOrigin = isDevelopment ? devServerOrigin : prodAppOrigin

export const googleClientId = process.env.GOOGLE_CLIENT_ID as string
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string
