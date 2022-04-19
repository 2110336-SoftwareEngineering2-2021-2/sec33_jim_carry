import { fromBase64 } from 'b64-lite'
import {
  AuthenticationError,
  COOKIE_SESSION_TOKEN,
  hash256,
  isPast,
  SessionConfig,
  SESSION_TOKEN_VERSION_0,
  TOKEN_SEPARATOR,
} from 'blitz'
import cookie from 'cookie'
import { Socket } from 'socket.io'

type Cookies = { [key: string]: string }

const parseSessionToken = (token: string) => {
  const [handle, id, hashedPublicData, version] =
    fromBase64(token).split(TOKEN_SEPARATOR)

  if (!handle || !id || !hashedPublicData || !version) {
    throw new AuthenticationError('Failed to parse session token')
  }

  return {
    handle,
    id,
    hashedPublicData,
    version,
  }
}

export async function authenticateSocket(socket: Socket): Promise<number> {
  const cookies = cookie.parse(socket.handshake.headers.cookie || '')
  const userId = await getUserId(cookies)
  if (!userId) {
    throw new AuthenticationError('Not authenticated')
  }
  return userId
}

async function getUserId(cookies: Cookies) {
  const sessionKernel = await getSessionKernel(cookies)
  if (sessionKernel === null) {
    return null
  }
  return sessionKernel.userId
}

async function getSessionKernel(cookies: Cookies) {
  const sessionToken = cookies[COOKIE_SESSION_TOKEN()]

  if (!sessionToken) {
    return null
  }

  const { handle, version, hashedPublicData } = parseSessionToken(sessionToken)

  if (!handle) {
    return null
  }

  if (version !== SESSION_TOKEN_VERSION_0) {
    console.log(
      new AuthenticationError(
        'Session token version is not ' + SESSION_TOKEN_VERSION_0
      )
    )
    return null
  }

  const sessionConfig = global.sessionConfig as SessionConfig
  const persistedSession = await sessionConfig.getSession(handle)
  if (!persistedSession) {
    return null
  }
  if (!persistedSession.antiCSRFToken) {
    throw new Error('Internal error: persistedSession.antiCSRFToken is empty')
  }
  if (persistedSession.hashedSessionToken !== hash256(sessionToken)) {
    return null
  }
  if (persistedSession.expiresAt && isPast(persistedSession.expiresAt)) {
    return null
  }
  return persistedSession
}
