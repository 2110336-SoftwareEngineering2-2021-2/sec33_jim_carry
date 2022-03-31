import blitz from 'blitz/custom-server'
import { createServer } from 'http'
import { log } from 'next/dist/server/lib/logging'
import { Server as SocketIoServer } from 'socket.io'
import { parse } from 'url'

import { ChatManager } from 'app/chat/realtime/server/ChatManager'
import { isDevelopment } from 'app/core/environment'
import * as parser from 'app/core/utils/superjsonParser'

const { PORT = '3000' } = process.env
const app = blitz({ dev: isDevelopment })
const handle = app.getRequestHandler()

async function initServer() {
  await app.prepare()
  const chatManager = new ChatManager()
  const server = createServer((req, res) => {
    req.chatManager = chatManager
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url!, true)
    const { pathname, query } = parsedUrl

    if (pathname?.startsWith('/api')) {
      handle(req, res, parsedUrl)
      return
    }

    app.render(req, res, pathname!, query)
  }).listen(PORT, () => {
    log.success(`Ready on http://localhost:${PORT}`)
  })
  const ioServer = new SocketIoServer(server, {
    parser,
  })
  chatManager.initialize(ioServer)
}

initServer()
