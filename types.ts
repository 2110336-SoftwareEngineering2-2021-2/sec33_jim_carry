import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz'
import { User } from 'db'

import type { ChatManager } from 'app/chat/realtime/server/ChatManager'

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = 'ADMIN' | 'USER'

declare module 'blitz' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
    chatManager: ChatManager
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User['id']
      role: Role
    }
  }
}

declare module 'http' {
  interface IncomingMessage {
    chatManager: ChatManager
  }
}
