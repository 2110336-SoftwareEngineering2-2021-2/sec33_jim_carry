import { passportAuth } from 'blitz'
import db from 'db'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import {
  appOrigin,
  googleClientId,
  googleClientSecret,
  prodAppOrigin,
} from 'app/core/environment'

const authApi = passportAuth({
  successRedirectUrl: '/',
  errorRedirectUrl: '/',
  strategies: [
    {
      authenticateOptions: {
        scope: 'openid email profile',
      },
      strategy: new GoogleStrategy(
        {
          clientID: googleClientId,
          clientSecret: googleClientSecret,
          callbackURL: `${prodAppOrigin ?? ''}/api/auth/google/callback`,
        },
        async function (accessToken, refreshToken, profile, cb) {
          if (!profile.emails || !profile.emails[0]) {
            return cb(new Error("Google OAuth response doesn't contain email"))
          }
          const email = profile.emails[0].value
          const picture = profile.photos?.[0]?.value
          const user = await db.user.upsert({
            where: { email },
            create: {
              name: profile.displayName,
              email,
              googleId: profile.id,
              profileImage: picture,
            },
            update: {
              name: profile.displayName,
              googleId: profile.id,
              profileImage: picture,
            },
          })
          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: 'google',
          }
          return cb(null, { publicData })
        }
      ),
    },
  ],
})

export default authApi
