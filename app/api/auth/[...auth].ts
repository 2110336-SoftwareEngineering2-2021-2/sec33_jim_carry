import { passportAuth } from "blitz"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import db from "db"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      authenticateOptions: {
        scope: "openid email profile",
      },
      strategy: new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: "http://localhost:3000/api/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, cb) {
          if (!profile.emails || !profile.emails[0]) {
            return cb(new Error("Google OAuth response doesn't contain email"))
          }
          const email = profile.emails[0].value
          const user = await db.user.upsert({
            where: { email },
            create: { name: profile.displayName, email, googleId: profile.id },
            update: { name: profile.displayName, googleId: profile.id },
          })
          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "google",
          }
          return cb(null, { publicData })
        }
      ),
    },
  ],
})
