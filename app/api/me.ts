import { BlitzApiHandler, invokeWithMiddleware } from "blitz"

import getCurrentUser from "app/users/queries/getCurrentUser"

const handler: BlitzApiHandler = async (req, res) => {
  const user = await invokeWithMiddleware(getCurrentUser, {}, { req, res })
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(user))
}
export default handler
