import blitz from 'blitz/custom-server'
import { createServer } from 'http'
import { log } from 'next/dist/server/lib/logging'
import { parse } from 'url'

import { isDevelopment } from 'app/core/environment'

const { PORT = '3000' } = process.env
const app = blitz({ dev: isDevelopment })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
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
})
