import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'mayday',
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  env: {
    APP_ORIGIN: process.env.APP_ORIGIN,
    BLITZ_DEV_SERVER_ORIGIN: process.env.BLITZ_DEV_SERVER_ORIGIN,
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  images: {
    domains: ['images.unsplash.com'],
  },
}
module.exports = config
